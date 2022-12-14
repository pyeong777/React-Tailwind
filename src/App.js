import './App.css';
import DiaryEditor from './DiaryEditor'
import DiaryList from './DiaryList';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import React, { useRef, useMemo, useEffect, useCallback, useReducer } from 'react';
dayjs.locale('ko');

const reducer = (state, action) => {
    switch(action.type) {
      case 'INIT': {
        return action.data;
      }
      case 'CREATE': {
        return [action.data, ...state];
      }
      case 'REMOVE': {
        return state.filter((it) => it.id !== action.targetId);
      }
      case 'EDIT': {
        return state.map((it) => it.id === action.targetId? {...it, content:action.newContent} : it);
      } 
      default :
      return state;
    }
};

export const DiaryStateContext = React.createContext(); 
//data만 내려줌 
export const DiaryDispatchContext = React.createContext(); 
//oncreate onremove onedit props를 data와 같이내려주면 data state가 바뀔때마다 리렌더링이 되어서 최적화가 쓸모가없어지게됨

const App = () => {

const [data, dispatch] = useReducer(reducer, []);

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
  dispatch({type: 'INIT', data: initData})
};

useEffect(() => {
  getData();
}, []); 

const onCreate = useCallback((author, content, emotion) => {
  dispatch({type: 'CREATE', data: {author, content, emotion, nowDate, id:dataId.current}})
  dataId.current += 1;
},[]);

const onRemove = useCallback((targetId) => {
  dispatch({type: 'REMOVE', targetId});
},[]);

const onEdit = useCallback((targetId, newContent) => {
  dispatch({type: 'EDIT', targetId, newContent});
},[]);

const memoizedDispatches = useMemo(() => {
  return {onCreate, onRemove, onEdit};
}, []);


const getDiaryAnalysis = useMemo(() => {
  const goodCount = data.filter((it) => it.emotion >=3).length;
  const badCount = data.length-goodCount;
  const goodRatio = (goodCount/data.length)*100;
  return { goodCount, badCount, goodRatio}; 
}, [data.length]
);

const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

 return (
  <DiaryStateContext.Provider value={data}>
    <DiaryDispatchContext.Provider value={memoizedDispatches}>
      <div className='App'>
        <DiaryEditor />
        <div>전체 일기 : {data.length}</div>
        <div>기분 좋은 일기 개수 : {goodCount}</div>
        <div>기분 나쁜 일기 개수 : {badCount}</div>
        <div>기분 좋은 일기 비율 : {goodRatio}</div>
        <DiaryList />
      </div>
    </DiaryDispatchContext.Provider>
 </DiaryStateContext.Provider>
 );
}

export default App;

