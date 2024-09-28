import { useAppDispatch, useAppSelector, increment } from "./store"

function App() {
  const dispatch = useAppDispatch()
  const value = useAppSelector((state) => state.example.value)

  return (
    <>
      <h1>Unit of Work</h1>
      <p>Value: {value}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </>
  )
}

export default App
