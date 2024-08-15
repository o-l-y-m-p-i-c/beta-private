import { useEffect, useState } from "react"
import { apiPaths, PUBLIC_API_KEY, PUBLIC_API_URL } from "../../constants/api"
import axios from "axios"
import styles from './styles.module.scss'
import { Link } from "react-router-dom"
import { ProfileButton } from '../ProfileButton'
import DocumentIcon  from "../../assets/icons/document"
import { fullTimeFormatter } from "../../hooks/dataTimeFormater"
import Typography from "../Typography"
import cx from "classnames"
import { useMemo } from "react"
import { Graph2D } from "../Graph2D"

export const CollectionItem = ({id, className,column_className}) => {
    const [item, setItem] = useState(null)


   

    useMemo(()=>{
        if(id){
            axios(
                {
                    method: 'GET',
                    url : `${PUBLIC_API_URL}${apiPaths.getArticle}?articleId=${id - 1}`,
                    headers:{
                        "x-api-key": PUBLIC_API_KEY
                    }
                }
            ).then((respopnse) => {
                setItem(respopnse.data.data)
            }).catch((err) => {
                console.log(`${PUBLIC_API_KEY}`,err)
                // console.log(err)
            })
        }
    },[id])


    return <div className={className}>
        {item && <>
            <div className={column_className}>
                <DocumentIcon 
                    className={styles.icon}
                />
                <Link 
                    to={'/graph/'+ id}
                    className={styles.title}
                >
                    <Typography type="h3">
                        {item.title}
                    </Typography>
                    
                </Link>
                <div className={styles.row}>
                    <ProfileButton
                        username={item.owner.username || 'Anonymous'}
                        id={item.owner.id}
                    />
                    {item.field && <div className="">
                        <div className={cx(styles.fieldTitle, styles.inline)}>
                            <Typography type="h4" className={styles.inline}>
                                Field:
                            </Typography>
                        </div>
                        {' '}
                        <div className={styles.inline}>
                        {item.field || 'Empty'}
                        </div>
                    </div>}
                    {/*  */}

                    <div className="">
                        <div className={cx(styles.fieldTitle, styles.inline)}>
                            <Typography type="h4" className={styles.inline}>
                                Created:
                            </Typography>
                        </div>
                        {' '}
                        <div className={styles.inline}>
                            {fullTimeFormatter(item.createdAt)}
                        </div>
                    </div>

                    <div className="">
                        <div className={cx(styles.fieldTitle, styles.inline)}>
                            <Typography type="h4" className={styles.inline}>
                                Last update:
                            </Typography>
                        </div>
                        {' '}
                        <div className={styles.inline}>
                            {fullTimeFormatter(item.updatedAt)}
                        </div>
                    </div>

                    <div className="">
                        <div className={cx(styles.fieldTitle, styles.inline)}>
                            <Typography type="h4" className={styles.inline}>
                                Status:
                            </Typography>
                        </div>
                        {' '}
                        <div className={styles.inline}>
                            {item.status}
                        </div>
                    </div>

                   {item.topCoreEntities &&  <div className="">
                        <div className={cx(styles.fieldTitle, styles.inline)}>
                            <Typography type="h4" className={styles.inline}>
                                Core entities:
                            </Typography>
                        </div>
                        {' '}
                        <div className={styles.inline}>
                        {item.topCoreEntities}
                        </div>
                    </div>}


                    {/*  */}

                </div>
            </div>
            {/* <div className={column_className}>
                <div className={styles.column}>
                    {item.topCoreEntities}
                </div>
            </div> */}
            
            {(item?.graphDraft.length > 0 || item?.graph.length > 0) && <div className={styles.graph2d_col}>
                <div className={styles.graph2d_col_inner}>
                    <Graph2D
                        graphData = {
                            // []
                            item?.graphDraft.length ? item?.graphDraft : item?.graph
                        }
                        setGraphData={() => {}}
                        isEdit={false}
                        isLoading={false}
                        onFullScreen={false}
                        articleId= {item?.id}
                        isOwner={false}
                        setNodesLabelWithoutEdges={() => {}}
                        isPublished
                    />
                </div>
            </div>}
        </>}

    </div>
}