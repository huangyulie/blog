import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import { SETTING } from '../../config';

const treeData = SETTING;

const Demo = (props) => {
    console.log(props.showMenu);
    const [checkedKeys, setCheckedKeys] = useState([...props.showMenu]);
    const onCheck = (checkedKeysValue) => {
        props.getMenu(checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };
    useEffect(()=>{
        console.log('123123');
    },[checkedKeys]);
    return (
        <Tree
            checkable   //允许选中
            defaultExpandAll={true}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={treeData}
        />
    );
};

export default Demo;