
import { useState } from 'react'

function App() {

    const [ count, setCount ] = useState<number>( 0 );

    return (
        <>
            <div className="inline-block min-w-12 text-center">{ count }</div>
            <button className="p-4 text-center" onClick={ () => setCount( count + 1 ) }>Count Plus</button>
            <button className="p-4 text-center" onClick={ () => setCount( count - 1 ) }>Count Minus</button>
        </>
    )
}

export default App;
