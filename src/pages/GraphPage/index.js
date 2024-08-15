import {Helmet} from 'react-helmet'
import { Graph } from '../../containers/Graph'
import { GraphLayout } from '../../layouts/GraphLayout'

export const GraphPage = () =>{
    return <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Graph dynamic</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <GraphLayout>
        <Graph />
    </GraphLayout>
</>
}