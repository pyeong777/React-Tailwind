import './App.css';
import DiaryEditor from './DiaryEditor'
import DiaryList from './DiaryList';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

const nowDate = dayjs().format('YYYY-MM-DD ddd HH:mm:ss');

const dummyList = [
  {
    id: 1,
    author: "id1",
    content: "hihihi",
    emotion: 3,
    created_date: nowDate
  },
  {
    id: 2,
    author: "id2",
    content: "hihihi",
    emotion: 5,
    created_date: nowDate
   },
   {
    id: 3,
    author: "id3",
    content: "hihihi",
    emotion: 1,
    created_date: nowDate
   }
]

function App() {
 return (
    <div className='App'>
      <DiaryEditor />
      <DiaryList diaryList={dummyList}/>
 </div>
 );
}

export default App;
