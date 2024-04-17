import { FaEye } from "react-icons/fa"
import DefaultPoster from "../assets/poster.jpg"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from '../axios'
import { useAppSelector } from "../app/hooks"

function Story() {
    const { id } = useParams();
    const user: any = useAppSelector((state) => state.auth.data);

    const [story, setStory] = useState({ 
        poster: '',
        title: '',
        author: { username: '', _id: '' },
        text: '',
        views: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`/api/stories/${id}`)
        .then((res) => {
            setStory(res.data)
            setLoading(false)
        })
        .catch((error: any) => {
            console.log(error)
        })
    }, [id])

    return (
        <div className="container-lg my-5">
            {
                loading ? 
                (
                    <div className="text-center mt-5">
                        <h3 className="text-secondary fw-bold fs-4">Wait a sec...</h3>
                    </div>
                ) :
                (
                <div className="row text-center justify-content-center">
                    <div className="rounded">
                        <img src={story.poster ? `http://localhost:5000/${story.poster}` : DefaultPoster} alt={story.title} height="300px" width="200px" />
                    </div>
                    <h2 className="lead fw-bold mt-5">{story.title}</h2>
                    {
                        user._id === story.author._id ?
                        (
                            <div className="mt-3">
                                <div className="d-flex flex-row justify-content-center text-center">
                                    <div>
                                        <button className="btn btn-secondary">
                                            Edit
                                        </button>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger ms-2">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                    <h4 className="text-info lead fw-bold mt-5">Published by {story.author.username}</h4>
                    <p className="text-secondary lead fw-bold mt-2"><FaEye className="me-2" />Seen by {story.views}</p>
                    <p className="lead mt-2">{story.text}</p>
                </div>
            )
            }
            
        </div>
    )
}

export default Story