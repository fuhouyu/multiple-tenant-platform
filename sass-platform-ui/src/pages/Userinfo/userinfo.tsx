/*
 * Copyright 2024-2024 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store";
import {UserinfoInterface} from "@/model/user";
import {Button, Form, Input, message, Radio} from "antd";
import './index.scss'
import {fetchEditUserinfo} from "@/store/modules/user";

interface UserinfoFormInterface {
    label: string;
    key: string;
    value: string;
    disabled: boolean;
}

/**
 * 用户详情
 * @constructor 构造函数
 */
export const Userinfo: React.FC = () => {

    const userinfo: UserinfoInterface = useAppSelector<UserinfoInterface>((state: {
        user: { userinfo: UserinfoInterface }
    }) => state.user.userinfo);

    const formItem: UserinfoFormInterface[] = [
        {key: 'username', label: '登录名', value: userinfo.username, disabled: true},
        {key: 'realName', label: '真实姓名', value: userinfo.realName, disabled: false},
        {key: 'nickname', label: '昵称', value: userinfo.nickname, disabled: false},
        {key: 'email', label: '邮箱', value: userinfo.email, disabled: false},
        {key: 'loginDate', label: '最后登录时间', value: userinfo.loginDate, disabled: true},
        {key: 'loginIp', label: '最后登录ip', value: userinfo.loginIp, disabled: true},
    ]
    const dispatch = useAppDispatch<UserinfoInterface>();
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({...userinfo});
    }, [userinfo]);

    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const onCancel = (): void => {
        setButtonLoading(true)
        form.setFieldsValue({...userinfo});
        setButtonLoading(false);
    }


    const onFinish = (values: UserinfoInterface): void => {
        setButtonLoading(true);
        dispatch(fetchEditUserinfo(values))
            .then(() => {
                form.setFieldsValue({...values});
                setButtonLoading(false);
                message.success('修改成功');
            }).catch((error: Error) => {
            console.log('用户修改失败: ', error);
            message.error('用户修改失败');
        })
    }

    return (
        <>
            <Form className="userinfo-form"
                  form={form}
                  name="basic"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  style={{maxWidth: 600}}
                  onFinish={onFinish}
                  disabled={buttonLoading}
                  autoComplete="off"
            >
                {formItem.map((item: UserinfoFormInterface,) => (
                    <Form.Item<UserinfoInterface>
                        label={item.label}
                        name={item.key}
                        key={item.key}
                    >
                        <Input disabled={item.disabled} key={item.key}/>
                    </Form.Item>
                ))}

                <Form.Item name="gender" key="gender" label="性别">
                    <Radio.Group>
                        <Radio value='male'>男</Radio>
                        <Radio value='female'>女</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item className="userinfo-submit text-align-center" wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit" loading={buttonLoading}>
                        保存
                    </Button>
                    <Button type="primary" danger onClick={onCancel}>
                        取消
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
