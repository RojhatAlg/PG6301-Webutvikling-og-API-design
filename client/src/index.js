import ReactDom from 'react-dom'
import Test from './test'

const App = () => {
    return(
        <>
        <h1>App component!</h1>
        <Test />
        </>
        
    )
    
}

ReactDom.render(<App />, document.getElementById('root'));