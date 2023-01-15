## fallback

### false

getStaticPaths로 반환되지 않은 path외 모든 path는 자동으로 404페이지를 라우팅해줍니다.

이럴때 false를 넣는다.

동적라우팅의 path가 적어서 적은 수의 path만 프리렌더링 해야하는 경우
새로운 페이지가 추가 될 일이 많지 않은 경우

-   만약 새로운 페이지가 자주 추가 된다면, 추가될때마다 다시 빌드해줘야한다. (주기적으로는 getStaticprops revalidate로 설정도 가능할 것 같긴하다)
    
    

#### true

true가 되면 getStaticProps의 동작이 변한다,

getStaticPaths가 반환한 path들은 빌드 타임에 HTML로 렌더링된다
이외의 path들에 대한 요청이 들어온 경우, 404 페이지를 반환하지 않고, 페이지의 "fallback" 버전을 먼저 보여준다
백그라운드에서 Next js가 요청된 path에 대해서 getStaticProps 함수를 이용하여 HTML 파일과 JSON 파일을 만들어낸다
백그라운드 작업이 끝나면, 요청된 path에 해당하는 JSON 파일을 받아서 새롭게 페이지를 렌더링한다. 사용자 입장에서는 [ fallback → 풀 페이지 ]와 같은 순서로 화면이 변하게된다.
새롭게 생성된 페이지를 기존의 빌드시 프리렌더링 된 페이지 리스트에 추가한다. 같은 path로 온 이후 요청들에 대해서는 이때 생성한 페이지를 반환하게된다.
fallback 상태란
"fallback" 상태일 때 보여줄 화면은 next/router의 router.isFallback 값 체크를 통해서 조건 분기하면 된다. 이때 페이지 컴포넌트는 props로 빈값을 받게된다.

예시

// pages/posts/[id].js
import { useRouter } from 'next/router'

function Post({ post }) {
const router = useRouter()

// If the page is not yet generated, this will be displayed
// initially until getStaticProps() finishes running
if (router.isFallback) {
return <div>Loading...</div>
}

// Render post...
}
이럴때 true로 넣는다

데이터에 의존하는 정적 페이지를 많이 가지고 있으나, 빌드 시에 모든 페이지를 생성하는건 너무나 큰 작업일 때
이럴경우 몇몇 페이지들만 정적으로 생성하게 하고, fallback 옵션을 true로 설정해주면 이후 요청이 오는 것에 따라서 정적 페이지들을 추가하게 된다
→ 빌드 시간도 단축하고, 대부분 사용자들의 응답 속도도 단축할 수 있다
#### blocking

전반으로 true일 경우와 비슷하게 동작하지만, 최초 만들어놓지않은 path에 대한 요청이 들어온 경우 fallback 상태를 보여주지 않고 SSR처럼 동작한다. 이후 true 옵션과 같이 기존의 정적 페이지 리스트에 새로 생성한 페이지를 추가한다.
