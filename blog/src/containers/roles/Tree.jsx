import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import { SETTING } from '../../config';

const treeData = SETTING;

const Demo = (props) => {
    let {showMenu} = props;
    const [checkedKeys, setCheckedKeys] = useState([]);
    useEffect(()=>{
        setCheckedKeys(showMenu);
    },[showMenu]);

    const onCheck = (checkedKeysValue) => {
        props.getMenu(checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };

    return (
        <div>
            <Tree
            checkable   //允许选中
            defaultExpandAll={true}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={treeData}
            />
        </div>
    );
};

export default Demo;