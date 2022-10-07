# History API를 사용한 최소 기능 SPA Router

## 개요

프리온보딩 프론트엔드 챌린지 [CSR / SSR with Next.js] 1회차 과제

## 동작

https://user-images.githubusercontent.com/83255812/194525143-5b22bee4-4f66-43f0-8474-4ef5e724b488.mp4

## 구현

1. 해당 주소로 진입했을 때 아래 주소에 맞는 페이지가 렌더링 되어야 한다.

   - 반복문을 통해 Router Children의 props를 확인하여, 현재 url과 동일한 path를 가지고 있는 child를 return 하였다.

     ```javascript
     /* App.tsx */

     function App() {
       return (
         <Router>
           <Route path="/" component={<Root />} />
           <Route path="/about" component={<About />} />
         </Router>
       );
     }
     ```

     ```javascript
     /* components/Router.tsx */

     const target = React.Children.map(children, (child) => {
       if (React.isValidElement < { path: string } > child) {
         const {
           props: { path },
         } = child;

         if (path === window.location.pathname) {
           return child;
         }
       }
     });

     return <>{target}</>;
     ```

2. 버튼을 클릭하면 해당 페이지로, 뒤로 가기 버튼을 눌렀을 때 이전 페이지로 이동해야 한다.

   - history.push를 통해 url을 변경하고 변경된 url을 전역 상태로 관리하였다.
   - Router에서 url 변경을 감지하기 위해 pathAtom을 구독하였다.
   - Router에서 popstate 이벤트를 등록하여 앞, 뒤로 가기 버튼이 눌림을 감지하였다.
   - popstate 이벤트 발생 시 변경된 url을 전역 상태에 저장하여 Router 컴포넌트를 리렌더링 하였다.

     ```javascript
     /* hooks/useRouter.tsx */

     export default function useRouter() {
       const [path, setPath] = useRecoilState(pathAtom);

       function push(path: string) {
         window.history.pushState({ path }, "", path);
         setPath(path);
       }

       return { path, push };
     }
     ```

     ```javascript
     /* components/Router.tsx */

     const [path, setPath] = useRecoilState(pathAtom);

     useEffect(() => {
       const handleOnPopstate = (event: PopStateEvent) => {
         const {
           state: { path },
         } = event;

         setPath(path);
       };

       window.addEventListener("popstate", handleOnPopstate);

       return () => {
         window.removeEventListener("popstate", handleOnPopstate);
       };
     }, [setPath]);
     ```

3. 최소한의 push 기능을 가진 useRouter Hook을 작성한다.

   ```javascript
   export default function useRouter() {
     const [path, setPath] = useRecoilState(pathAtom);

     function push(path: string) {
       window.history.pushState({ path }, "", path);
       setPath(path);
     }

     return { path, push };
   }
   ```

   ```javascript
   export default function Root() {
     const { push } = useRouter();
     return (
       <div>
         <h1>Root</h1>
         <button
           onClick={() => {
             push("/about");
           }}
         >
           about으로 이동
         </button>
       </div>
     );
   }
   ```

## 아쉬웠던 점

- History API를 제대로 숙지하지 못한 채 구현함. `pushState`와 `popstate` 이벤트 공부 필요.

- React.FC vs JSX.Element vs React.ReactNode (응애)

## 참고

https://jeonghwan-kim.github.io/dev/2022/05/06/react-router.html
