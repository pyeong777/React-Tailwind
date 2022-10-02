import './App.css';
import DiaryEditor from './DiaryEditor'
import DiaryList from './DiaryList';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
dayjs.locale('ko');

function App() {
const [data, setData] = useState([]);

const dataId = useRef(0);

const nowDate = dayjs().format('YYYY-MM-DD ddd HH:mm:ss');

const getData = async() => {
  const res = await fetch('https://jsonplaceholder.typicode.com/comments');
  const jsonData = await res.json();
  
  const initData = jsonData.slice(0,20).map((it) => {
    return {
      author: it.email,
      content: it.body,
      emotion: Math.floor(Math.random() * 5) + 1,
      created_date: nowDate,
      id: dataId.current++
    }
  })

  setData(initData);
};

useEffect(() => {
  getData();
}, []); 

const onCreate = (author, content, emotion) => {
  
  const newItem = {
    author,
    content,
    emotion,
    nowDate,
    id : dataId.current,
  };
  dataId.current += 1;
  setData([newItem, ...data])
};

const onRemove = (targetId) => {
  const newDiaryList = data.filter((item) => item.id !== targetId);
  setData(newDiaryList);
};

const onEdit = (targetId, newContent) => {
  setData(
    data.map((it) => it.id === targetId ? {...it, content:newContent} : it)
  )
};

 return (
    <div className='App'>
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
 </div>
 );
}

export default App;
