/*MongoDB의 연결 URL을 가져오기 위해 사용
데이터베이스에 연결할 때 필요한 정보이므로, 별도의 설정 파일에서 관리하여 코드의 유지보수성을 높임*/
import { getMongoUrl } from '../../config/db';
/*MongoDB와 연결하기 위한 클라이언트를 가져오기 위해 사용
MongoDB에 대한 CRUD 작업을 수행하기 위해 MongoClient 가 필요하며, 데이터베이스와의 연결을 관리함*/
import { MongoClient } from 'mongodb';

/*
 *구분:	pages/api/search.js
 *역할:	API 엔드포인트
 *목적:	클라이언트 요청에 대한 데이터 반환
 *데이터 처리 방식:	클라이언트 요청 시 데이터베이스 쿼리 실행
 *응답 형식:	JSON 형식으로 데이터 반환
 * */

/*searchHandler 함수는 API 엔드포인트로서 클라이언트의 요청을 처리하기 위해 정의
async 키워드가 사용되어 비동기 작업을 수행할 수 있으며, req 와 res 매개변수는 각각 요청과 응답 객체를 나타냄*/
export default async function searchHandler(req, res) {
  /*클라이언트가 보낸 요청의 HTTP 메서드가 GET 이 아닌 경우를 확인
  이 API 는 GET 요청에만 응답하도록 설계되어 있음*/
  if (req.method !== 'GET') {
    /*허용되지 않는 메서드에 대해 405 상태 코드를 반환
     *클라이언트에게 요청이 잘못되었음을 알리기 위해 명확한 HTTP 응답 코드를 반환*/
    res.status(405).end();
    return;
  }

  /*왜?: 클라이언트 요청의 쿼리 매개변수에서 query 값을 추출하며
이유: 이 query 값은 검색할 키워드로 사용되며, API 의 메인 기능에 필요한 데이터를 가져오기 위해 필요함*/
  const { query } = req.query;
  /*왜?: MongoDB에 연결하기 위해 MongoClient.connect 메서드를 호출합니다.
이유: 데이터베이스 작업을 수행하기 위해 먼저 MongoDB 와 연결이 필요합니다.
await 키워드는 연결이 완료될 때까지 기다립니다.*/
  const client = await MongoClient.connect(getMongoUrl());
  /*왜?: 연결된 클라이언트로부터 데이터베이스 객체를 가져옵니다.
이유: 이 db 객체를 통해 데이터베이스에 직접 접근하여 쿼리를 실행할 수 있습니다.*/
  const db = client.db();
  /*왜?: vitamins 라는 이름의 컬렉션에 접근합니다.
이유: 이 컬렉션에서 비타민 관련 데이터를 검색하고 조작하기 위해 컬렉션 객체가 필요합니다.*/
  const vitaminsCollection = db.collection('vitamins');
  /*왜?: vitaminsCollection 에서 검색 결과를 가져오기 위해 쿼리를 실행합니다.
이유: 비타민 데이터에서 특정 조건에 맞는 결과를 찾기 위해 쿼리를 사용합니다.*/
  const searchResults = await vitaminsCollection
    /*.find({
왜?: 데이터베이스에서 조건에 맞는 문서를 찾기 위한 메서드입니다.
이유: MongoDB의 CRUD 작업 중 하나로, 특정 조건에 맞는 데이터를 검색하는 기능을 제공합니다.*/
    .find({
      /*왜?: MongoDB의 텍스트 검색 기능을 사용하여 query 로 전달된 검색어에 맞는 데이터를 찾습니다.
이유: 텍스트 검색 기능을 사용하면 여러 필드에서 특정 단어나 구문을 쉽게 검색할 수 있습니다. 
이 경우, query 에 해당하는 비타민 정보를 찾기 위해 필요합니다.*/
      $text: {
        $search: query,
      },
    })
    /*}).toArray();
왜?: 쿼리 결과를 배열로 변환합니다.
이유: 결과를 배열 형태로 반환해야 클라이언트가 쉽게 처리할 수 있으므로, 배열로 변환하여 응답합니다.*/
    .toArray();
  /*왜?: 데이터베이스와의 연결을 종료합니다.
이유: 연결을 종료하지 않으면 리소스가 낭비되므로, 모든 데이터베이스 작업이 완료된 후에는 반드시 연결을 닫아야 합니다.*/
  await client.close();
  /*왜?: 성공적인 요청에 대해 200 상태 코드와 함께 검색 결과를 JSON 형식으로 반환합니다.
이유: 클라이언트가 요청한 데이터를 성공적으로 처리했음을 알리고, 필요한 정보를 JSON 형식으로 제공하여 클라이언트에서 쉽게 사용할 수 있도록 함*/
  res.status(200).json(searchResults);
}
