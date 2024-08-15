import {Helmet} from 'react-helmet'
import { MainLayout } from '../../layouts/MainLayout'
import { KnowledgeBaseContainer } from '../../containers/KnowladgeBase'
import { PageHead } from '../../components/PageHead'

export const GraphCollectionPage = () =>{
    return <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Collection</title>
        <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <MainLayout>
        <div className="">
            <PageHead
                title='Knowledge base'
            />
            <KnowledgeBaseContainer />
        </div>
    </MainLayout>
</>
}