import { Col, Row, Input, Typography, Radio, Select, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux'
// import { searchFilterChange, priorityFilterChange, statusFilterChange } from '../../redux/actions';
import filtersSlice from './filtersSlice';

const { Search } = Input;

export default function Filters() {
  const [searchText, setSearchText] = useState("")
  const [priorityChose, setPriorityChose] = useState('')
  const [statusChose, setStatusChose] = useState('')
  const dispatch = useDispatch()

  const handlePriorityChose = (e) => {
    const listPriority = []
    if(!listPriority.find(priority => priority === e)){
      listPriority.push(...e)
      setPriorityChose(listPriority)
      dispatch(filtersSlice.actions.priorityFilterChange(listPriority))
    } 
  }
  return (
    <Row justify='center'>
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Search placeholder='input search text' value={searchText} onChange={(e) => 
          {
            setSearchText(e.target.value)
            dispatch(filtersSlice.actions.searchFilterChange(e.target.value))
          }}/>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group value={statusChose} onChange={(e) => {
          setStatusChose(e.target.value)
          dispatch(filtersSlice.actions.statusFilterChange(e.target.value))
        }}>
          <Radio value='All'>All</Radio>
          <Radio value='Completed'>Completed</Radio>
          <Radio value='Todo'>To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select
          mode='multiple'
          allowClear
          placeholder='Please select'
          style={{ width: '100%' }}
          onChange= {(e) => handlePriorityChose(e)}
        >
          <Select.Option value='High' label='High'>
            <Tag color='red'>High</Tag>
          </Select.Option>
          <Select.Option value='Medium' label='Medium'>
            <Tag color='blue'>Medium</Tag>
          </Select.Option>
          <Select.Option value='Low' label='Low'>
            <Tag color='gray'>Low</Tag>
          </Select.Option>
        </Select>
      </Col>
    </Row>
  );
}
