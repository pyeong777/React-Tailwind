import './App.css';
import DiaryEditor from './DiaryEditor'
import DiaryList from './DiaryList';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useState } from 'react';
import { useRef } from 'react';
dayjs.locale('ko');

function App() {
const [data, setData] = useState([]);

const dataId = useRef(0);

const onCreate = (author, content, emotion) => {
  const nowDate = dayjs().format('YYYY-MM-DD ddd HH:mm:ss');
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

const onDelete = (targetId) => {
  const newDiaryList = data.filter((item) => item.id !== targetId);
  setData(newDiaryList);
};

 return (
    <div className='App'>
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList onDelete={onDelete} diaryList={data}/>
 </div>
 );
}

export default App;
