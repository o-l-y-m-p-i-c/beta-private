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
            
             <div className={styles.graph2d_col}>
                <Link 
                    to={'/graph/'+ id}
                    className={styles.title}
                >                    
                    <div className={styles.graph2d_col_inner}>
                    {(item?.graphDraft.length > 0 || item?.graph.length > 0) ? <Graph2D
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
                        /> : <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign:'center',
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="142" height="142" viewBox="0 0 142 142" fill="none">
                                <circle cx="71" cy="71" r="71" fill="#4659FE" fillOpacity="0.08" />
                                <path d="M40 42.5H57L63 47.5H98.5C102.918 47.5 106.5 51.0817 106.5 55.5V56.5V65.5H56L43 100H40C36.6863 100 34 97.3137 34 94V48.5C34 45.1863 36.6863 42.5 40 42.5Z" fill="white" />
                                <path d="M106.632 65.2V53.4588C106.632 50.1451 103.946 47.4588 100.632 47.4588H62.6437L59.5311 44.3446C58.0307 42.8434 55.9953 42 53.8728 42H40C36.6863 42 34 44.6863 34 48V93C34 96.866 37.134 100 41 100H42.8659M106.632 65.2H121.6C122.286 65.2 122.768 65.8753 122.546 66.5244L111.992 97.2976C111.438 98.9142 109.917 100 108.208 100H42.8659M106.632 65.2H58.6026C56.9319 65.2 55.4371 66.2385 54.8541 67.8042L42.8659 100" stroke="#7C859E" strokeWidth="3" />
                            </svg>
                            <div className="" style={{marginTop:10, whiteSpace:'nowrap'}}>
                                <Typography type="span">
                                    Empty
                                </Typography>
                            </div>

                        </div>}
                    </div>
                </Link>
            </div>
        </>}

    </div>
}