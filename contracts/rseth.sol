//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;


import "./tokenHelpers/openzeppelin/ERC20.sol";
import "./tokenHelpers/openzeppelin/IERC20.sol";
import "./utils/openzeppelin/Ownable.sol";
import "./Interfaces/Ievaluator.sol";

/**
*@notice Interfaces of rETH 
*/
interface Ireth is IERC20{
    function deposit() external payable;
    function withdraw(uint256 rAmount) external;
    function userCSupply(address user) external returns (uint);
}

// ██████████████████████████████████████████████████████████████
// █▄─▄▄▀█─▄▄▄▄█▄─▄▄─█─▄─▄─█─█─███─▄─▄─█─▄▄─█▄─█─▄█▄─▄▄─█▄─▀█▄─▄█
// ██─▄─▄█▄▄▄▄─██─▄█▀███─███─▄─█████─███─██─██─▄▀███─▄█▀██─█▄▀─██
// ▀▄▄▀▄▄▀▄▄▄▄▄▀▄▄▄▄▄▀▀▄▄▄▀▀▄▀▄▀▀▀▀▄▄▄▀▀▄▄▄▄▀▄▄▀▄▄▀▄▄▄▄▄▀▄▄▄▀▀▄▄▀

/**
*@title Contract of the Stability Pool
* @author Refi
*/
contract rseth is ERC20,Ownable {

    Ireth immutable reth;
    uint public cooldownPeriod = 180;
    uint public freezePeriod = 500;
    uint public stabilityRequestedWithdraw;
    struct releaseTrack{
        uint timeAsked;
        uint rsAmount;
    }

    //Variable of eval for evaluator contract instances
    Ieval public eval;

    mapping (address => releaseTrack) public releaseStatus;
    event periodsChanged(uint newCPeriod,uint newFPeriod);
    event deposited(address user, uint amount, uint rsAmount);
    event requestWithdraw(address user,uint requestedrsAmount,uint canWithdrawTime);
    event withdrawn(address user,uint amountWithdrawn,uint rsAmountWithdrawn);

    
    constructor(address _reth) ERC20("rseth","rseth"){
        reth = Ireth(_reth);
    }

    /**
     *@notice function to receive the ETH
     */
    receive() external payable {
    }

    function setAddress(address _eval) external onlyOwner {
        eval = Ieval(_eval);
    }  

    modifier defense() {
       require(
         (eval.whitelisted(msg.sender)), //  make sure that the address is on our whiteList.
          "AUR_ERR" // aurthorisation error
        );
        _;
    }

    /**
    *@notice function to set the time periods of cooldown and freezing period
    *@param cperiod is new cooldown period to set
    *@param fperiod is new freeze period to set
    */    
    function setPeriods(uint cperiod,uint fperiod) external onlyOwner {
        cooldownPeriod = cperiod;
        freezePeriod = fperiod;
        emit periodsChanged(cperiod,fperiod);
    }


    /**
     * @notice Sender Supplies Eth and Receives rsEth(Stability Tokens) in return
     */
    function stake() external payable defense {
        _stake(msg.sender, msg.value);
    }


    /**
     * @notice Sender Supplies Eth and Receives rsEth in return
     * @param account The User Address Supplying Eth
     * @param amount Amount of Eth that User Supplied
     */
    function _stake(address account, uint256 amount) internal {
        uint256 init = reth.balanceOf(address(this));
        reth.deposit{value: amount}();
        uint256 rsamt = reth.balanceOf(address(this)) - init;
        _mint(account, rsamt);

        emit deposited(account,amount,rsamt);
    }


    /**
     * @notice function to request the withdraw amount
     * @param rsAmount The amount of Ctokens to be Redeemed
     */
    function requestRelease(uint rsAmount) external {
        require(rsAmount<=balanceOf(msg.sender),'Not sufficient balance');
        releaseStatus[msg.sender] = releaseTrack({timeAsked:block.timestamp,rsAmount:rsAmount});
        stabilityRequestedWithdraw+=rsAmount;
        emit requestWithdraw(msg.sender, rsAmount, block.timestamp+cooldownPeriod);
    }



    
    /**
     * @notice Sender redeems Rtokens in exchanges of unserlying asset
     * @param account The Account who wants to Redeem
     * @param rsAmount The amount of Ctokens to be Redeemed
     */
    function withdraw(address account,uint rsAmount) external {
        require(releaseStatus[account].rsAmount >= rsAmount,'You requested for lower amount');
        require(releaseStatus[account].timeAsked+cooldownPeriod<block.timestamp,'Please wait for cooldown');
        require(releaseStatus[account].timeAsked+freezePeriod>block.timestamp,'Claim Period Over');
        stabilityRequestedWithdraw-=releaseStatus[account].rsAmount;
        uint totalSupplyInitial = totalSupply();
        releaseStatus[account] = releaseTrack({timeAsked:0,rsAmount:0});
        _burn(account,rsAmount);
        uint amount =  address(this).balance;
        reth.withdraw(rsAmount*reth.balanceOf(address(this))/totalSupplyInitial);
        amount =  address(this).balance - amount;
        (bool sent, ) = payable(account).call{value: amount}("");
        require(sent, "Failed to send Ether");
        emit withdrawn(account, amount, rsAmount);
    }
}