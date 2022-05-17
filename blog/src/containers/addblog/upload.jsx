import React from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BASE_URL } from '../../config/index'
import { reqDelete } from '../../api/index';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class Uploadimg extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  getImgArr = () => {
    let res = [];
    this.state.fileList.forEach((item) => {
      res.push(item.name);
    })
    return res;
  }

  getImg = (img) => {
    this.state.fileList.push({ uid: -1, name: img, url: `${BASE_URL}/img/${img}` });
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = async ({ fileList, file }) => {
    // console.log(fileList);
    if (file.status === 'done') {
      let { url, name } = file.response.data;
      fileList[fileList.length - 1].url = url;
      fileList[fileList.length - 1].name = name;
      if (file.response.status === 0) {
        message.success('上传成功')
      } else {
        message.error('上传失败');
      }
    }
    if (file.status === 'removed') {
      let data = await reqDelete(file.name);
      if (data.status === 0) {
        message.success('删除成功');
      } else {
        message.error('删除失败');
      }
    }
    this.setState({ fileList })
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div>上传图片</div>
      </div>
    );
    return (
      <>
        <Upload
          action={`${BASE_URL}/img/upload`}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          method="post"
          name="img"
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default Uploadimg;