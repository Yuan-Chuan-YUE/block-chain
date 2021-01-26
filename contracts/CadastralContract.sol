pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "./EsToken.sol";
import "./DataStruct.sol";

contract CadastralContract{
    mapping(string => EsToken) nowEstateList;
    uint esCount;
    uint totalCount;
    uint flag;
    string [] temp;

    event eventSplit(
        string pId,
        string changeDate
    );

    event eventCreate(
        string Id,
        string createDate
    );

    event eventMerge(
        string childId,
        string changeDate
    );

    constructor() public{
        esCount = 0;
        totalCount = 0;
        flag = 0;
    }

    function create(string memory id,Data memory data,Polygon memory poly,string [] memory pa) public  payable{
        EsToken estate = new EsToken(id,data,poly,pa);
        nowEstateList[id] = estate;
        esCount += 1;
        totalCount += 1;
        if(flag == 0){
            emit eventCreate(id,data.begDate);
        }
    }

    function split(string memory sId,string [] memory newIdList,Data [] memory newDataList,Polygon [] memory polygonList, uint numOfnewEstate) public payable{
        flag = 1;

        EsToken estate = nowEstateList[sId];
        estate.setEndDate(newDataList[0].begDate);
        estate.setChildren(newIdList);
        string [1] memory pa;
        pa[0] = sId;
        temp = pa;

        for(uint i = 0;i < numOfnewEstate;i++){
            create(newIdList[i],newDataList[i],polygonList[i],temp);
        }
        esCount -= 1;

        emit eventSplit(sId,newDataList[0].begDate);
        flag = 0;
    }

    function merge(string [] memory mIdList,string memory newId,Data memory data,Polygon memory polygon,uint numOfMergeEstate) public payable{
        flag = 1;
        EsToken estate;
        string [1] memory chi;
        chi[0] = newId;
        temp = chi;
        for(uint i = 0;i < numOfMergeEstate;i++){
            estate = nowEstateList[mIdList[i]];
            estate.setEndDate(data.begDate);
            estate.setChildren(temp);
        }
        create(newId,data,polygon,mIdList);
        emit eventMerge(newId,data.begDate);
        flag = 0;
    }

    /*function getEstateAddress(string memory id) public view returns(address){
        string memory tmp = "";
        if(keccak256(abi.encodePacked(changeIdList[id])) != keccak256(abi.encodePacked(tmp))){
            return address(nowEstateList[changeIdList[id]]);
        }
        else{
            return address(nowEstateList[id]);
        }
    }*/
    function getEstateData(string memory Id) public view returns(Data memory,Polygon memory,string [] memory,string [] memory){

        EsToken estate = nowEstateList[Id];
        Data memory data = estate.getData();
        Polygon memory poly = estate.getPolygon();
        string [] memory pa = estate.getParents();
        string [] memory chi = estate.getChildren();
        return (data,poly,pa,chi);
    }
}
