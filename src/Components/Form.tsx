import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input,Select ,  DatePicker,Radio} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { useDispatch, useSelector } from 'react-redux';
import { addTasks } from '../store/TaskSlice';

const formItemLayout = {
    labelCol: { span: 10 },
    
    wrapperCol: { span: 25 },
  };
  
  const formTailLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8, offset: 4 },
  };
  

interface FormProps {
   Title: string,
   Priority: "High"| "Medium" | "Low",
   Status:"Completed" | "Not Completed",
   dueDate:string 

}
const { Option } = Select;

interface InputFormProps {
    submit:()=> void
}
function InputForm({submit}:InputFormProps) {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    useEffect(() => {
        form.validateFields(['Title']);
      }, [ form]);
      
    const onCheck = async () => {
        try {
          const values = await form.validateFields();
          console.log('Success:', values);
        
          const updatedDate:string=values.dueDate.$d.toString().slice(0,10)
          console.log("DATE",updatedDate);
          
          dispatch(addTasks({...values,dueDate:updatedDate}))

          form.resetFields()
          submit()
        } catch (errorInfo) {
          console.log('Failed:', errorInfo);
        }
      };
      const onPriorityChange = (value: string) => {
        switch (value) {
          case 'High':
            form.setFieldsValue({ note: 'High' });
            break;
          case 'Medium':
            form.setFieldsValue({ note: 'Medium' });
            break;
          case 'Low':
            form.setFieldsValue({ note: 'Low' });
            break;
          default:
        }
      };
  return (
    <div className='flex w-full'>
      <Form form={form} 
      layout='vertical'
      name="dynamic_rule"
    style={{ maxWidth: 600 }} className='w-full flex flex-col items-center -300'>
      <Form.Item<FormProps>
        {...formItemLayout}
        name="Title"
        label="Title"
       className='w-full px-4 font-semibold'
        rules={[{ required: true, message: 'Enter the title' }]}
      >
        <Input placeholder="Please Enter the title" />
      </Form.Item>
    <FormItem <FormProps>
    {...formItemLayout}
    name="Priority"
    label="Priority"
    className='w-full px-4 font-semibold'
    rules={[{ required: true }]}
    >
        <Select
          placeholder="Select a Priority"
          onChange={onPriorityChange}
          allowClear
        >
          <Option value="High">High</Option>
          <Option value="Medium">Medium</Option>
          <Option value="Low">Low</Option>
        </Select>
    </FormItem>
    
      
      <FormItem <FormProps>
        {...formItemLayout}
        rules={[{ required: true }]}
        name="Status"
        label="Status"
        className='w-full px-4 font-semibold'
      >
        <Radio.Group className='w-full flex items-center justify-between '>
            <Radio value="Completed">Completed </Radio>
            <Radio value="Not Completed" defaultChecked> Not Completed </Radio>
            
          </Radio.Group>
      </FormItem>
      <FormItem <FormProps>
      {...formItemLayout}
      name={"dueDate"}
      rules={[{ required: true }]}
      label="Date :"
      className=' w-full px-4 font-semibold'
      >
    <DatePicker className='w-full' />
      </FormItem>
      <Form.Item {...formTailLayout}   className=' w-full px-4 font-semibold'>
        <Button  size={"large"} className='w-full' type="primary" onClick={onCheck}>
        Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}




export default InputForm
