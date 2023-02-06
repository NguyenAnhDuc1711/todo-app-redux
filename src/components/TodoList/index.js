import { Col, Row, Input, Button, Select, Tag } from 'antd';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react';
import { todoListSelector } from '../../redux/selector';
import { addNewTodo, fetchTodos } from './todoListSlice';

export default function TodoList() {
  const [todoName, setToDoName] = useState('')
  const [priority, setPriority] = useState('Medium')
  const dispatch = useDispatch()
  const todoList = useSelector(todoListSelector)
  
  const handleAddButtonClick = () => {
  dispatch(addNewTodo({
          id: uuidv4(),
          name: todoName,
          priority: priority,
          completed: false
        }));
        setToDoName("");
        setPriority("Medium");
  }

  const handlePriorityChange = (value) => {
    setPriority(value)
  }
  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
      {todoList.map((todo) => 
      {
        return (
          <Todo 
          key={todo.id} 
          id={todo.id}
          name={todo.name} 
          prioriry={todo.priority} 
          completed={todo.completed}/>)}
        )
      }
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input id="todoName" value={todoName} onChange={(e) => setToDoName(e.target.value)} />
          <Select
          id="selectPriority"
          value={priority}
          onChange={handlePriorityChange}
          defaultValue="Medium">
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
          <Button onClick={() => {
            handleAddButtonClick()
            }} type='primary'>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
