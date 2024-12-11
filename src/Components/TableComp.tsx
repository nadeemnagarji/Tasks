import React, { useEffect, useState } from 'react';
import type { GetProp, TableProps } from 'antd';
import { Table,Tag } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { switchStatus } from '../store/TaskSlice';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TaskTableProps {
    Title: string,
    Priority: "High"| "Medium" | "Low",
    Status:"Completed" | "Not Completed",
    dueDate:string | null 
  }
interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: SorterResult<any>['field'];
    sortOrder?: SorterResult<any>['order'];
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
  }
  const columns: ColumnsType<TaskTableProps> = [
    {
      title: 'Title',
      dataIndex: 'Title',
      sorter: true,
      render: (Title) => `${Title}`,
      width:"25%",
    },
    {
      title: 'Priority',
      dataIndex: 'Priority',
      filters: [
        { text: 'High', value: 'High' },
        { text: 'Medium', value: 'Medium' },
        { text: 'Low', value: 'Low' },
      ],
      render: (_, { Priority }) => {
            let color = 'grey'
            if (Priority === 'High') {  
                color = 'red';
            } else if (Priority === 'Medium') {
                color = 'orange';
            }

            return(
                <Tag color={color} key={Priority}>
                    {Priority}
                </Tag>
            )
      }
      ,
      filterSearch: true,
        onFilter: (value, record) => record.Priority.startsWith(value as string),
      width:"25%",
    },
    {
        title: 'Status',
        dataIndex: 'Status',
        filters: [
          { text: 'Completed', value: 'Completed' },
          { text: 'Not Completed', value: 'Not Completed' },
        ],
        filterSearch: true,
        onFilter: (value, record) => record.Status.startsWith(value as string),
        render: (_, { Status }) => {
            let color = 'grey'
            if (Status === 'Completed') {  
                color = 'green';
            }

            return(
                <Tag
                onClick={()=>switchStatus()}
                className='rounded-full font-semibold cursor-pointer' color={color} key={Status}>
                    {Status}
                </Tag>
            )
      },
        width:"25%",
    },
    {
      title: 'due Date',
      dataIndex: 'due Date',
      width:"200px"
    },
  ];
function TableComp() {
    
    const tasks = useSelector((state:RootState)=>state.tasks)
    console.log(tasks);
    
    const [data, setData] = useState<TaskTableProps[]>(tasks);
    console.log("DATAAAAA",data);
    useEffect(() => { setData(tasks); }, [tasks]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
          current: 1,
          pageSize: 10,
        },
      });

    const handleTableChange: TableProps<TaskTableProps>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
          pagination,
          filters,
          sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
          sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
          }


        };
  return (
    <div className='w-full overflow-hidden '>
    <Table<TaskTableProps>
    className='w-full overflow-x-scroll  '
      columns={columns}
      rowKey={(record) => record.Title}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
    </div>
  )
}

export default TableComp
