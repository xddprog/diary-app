import {Button, message, Modal, Space, Typography, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useState} from "react";
import {sendHomework} from "../../../api/schedule.jsx";
import styled from "styled-components";


export default function SendHomework({drawerIsOpen, handler, homeworkId}) {
    const [fileList, setFileList] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();


    async function handleSubmit() {
        const r = await sendHomework(homeworkId, fileList).then(response => response);
    }

    async function onChangeUpload(info) {
        console.log(info)
    }

    const customRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const onRemove = (file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
    }

    const beforeUpload = (file) => {
        setFileList([...fileList, file])
        return false
    }
    return (
        <div>
            {contextHolder}
            <Modal
                destroyOnClose
                width={720}
                onCancel={() => handler(false)}
                open={drawerIsOpen}
                onOk={handleSubmit}
                okText='Отправить'
                footer={[
                    <Button key="submit" type="primary" onClick={handleSubmit}>
                        Отправить
                    </Button>
                ]}
            >
                <StyledSpace direction="vertical">
                    <Typography.Title level={2}>Загрузить домашнее задание</Typography.Title>
                    <Typography.Paragraph>
                        Вы можете загрузить максимум 10 файлов.
                        На данный момент загружено {'VALUE'} файла(-ов):<br/>
                        {'FILES LIST'}
                    </Typography.Paragraph>
                    <Upload
                        customRequest={customRequest}
                        onRemove={onRemove}
                        beforeUpload={beforeUpload}
                        onChange={onChangeUpload}
                        maxCount={10}
                    >
                        <Button icon={<UploadOutlined />}>Загрузить файлы</Button>
                    </Upload>
                </StyledSpace>
            </Modal>
        </div>
    )
}


const StyledSpace = styled(Space)`
    width: 100%;
    justify-content: center;
`