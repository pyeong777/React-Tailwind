import './App.css';
import DiaryEditor from './DiaryEditor'
import DiaryList from './DiaryList';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
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

const onCreate = useCallback((author, content, emotion) => {
  const newItem = {
    author,
    content,
    emotion,
    nowDate,
    id : dataId.current,
  };
  dataId.current += 1;
  setData((data) => [newItem, ...data])
},[]);

const onRemove = useCallback((targetId) => {
  setData((data) => data.filter((item) => item.id !== targetId));
},[]);

const onEdit = useCallback((targetId, newContent) => {
  setData((data) => data.map((it) => it.id === targetId ? {...it, content:newContent} : it))
},[]);

const getDiaryAnalysis = useMemo(() => {
  const goodCount = data.filter((it) => it.emotion >=3).length;
  const badCount = data.length-goodCount;
  const goodRatio = (goodCount/data.length)*100;
  return { goodCount, badCount, goodRatio}; 
}, [data.length]
);

const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

 return (
    <div className='App'>
      <DiaryEditor onCreate={onCreate}/>
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
 </div>
 );
}

export default App;
