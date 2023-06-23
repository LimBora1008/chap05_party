import React,{useState} from 'react';
import axios from 'axios';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';

// 화면 리사이징 오류 발생 해결
window.ResizeObserver = undefined;

export default function GitHubRepoDataGrid() {
    // 키워드 상태(state) 선언
    const [keyword, setKeyword] = useState('');
    // 레파지토리 상태 선언
    const [repositories, setRepositories] = useState([]);
    // 오류상태 선언
    const [error, setError] = useState(null);

    // 깃허브 레파지토리 검색 함수(화살표 함수)
    const searchRepositories = () => {
        axios
        .get(`https://api.github.com/search/repositories?q=${keyword}`)
        .then((response) => {
            // setRepositories(response.data.items); 원래코드
            console.log(response) // 응답데이터(원본)
            // 서버로 부터 JSON형식의 데이터를 JavaScript 객체로 변환한 결과

            // 응답데이터 (원본에서 data속성 추출)
            const responseData = response.data;
            console.log(responseData)

            // 응답 데이터의 data속성에서 items 속성값 추출
            const items = responseData.items;
            console.log(items)

            // repositories 상태 업데이트
            setRepositories(items);
            
            setError(null);
        })
        .catch((error) => {
            setRepositories([]);
            setError(error.message);
        });
    };

    // react-data-grid 컬럼 정의
    const columns = [
        {key: 'id', name: 'ID'},
        {key: 'name', name: 'Name'},
        {key: 'html_url', name: 'URL'},
    ];

    return (
        <div>
            <h1>GitHub Repository Search</h1>

            <input
                type='text'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Enter keyword'
            />

            <button onClick={searchRepositories}> Search </button>

            {error && <p>Error: {error}</p>}
            
            <DataGrid columns={columns} rows={repositories} />
        </div>
    );
}