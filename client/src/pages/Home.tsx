import { Link } from "react-router-dom"
import HeroImg from '../assets/home.png'
import DefaultPoster from '../assets/poster.jpg'
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchStories } from "../features/storiesSlice";


const Home = () => {
    const data = useAppSelector((state) => state.stories);
    
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchStories())
    }, [dispatch])

  return (
        <div className="container-lg my-5">
            <div className="row align-items-center align-content-center">
                <div className="col-md-6 mt-5 mt-md-0">
                    <div className="text-center">
                        <img src={HeroImg} alt="" className="img-fluid" height="350px" width="450px" />
                    </div>
                </div>
                <div className="col-md-6 mt-5 mt-md-0 order-md-first">
                    <div>
                        <h1 className="text-info text-uppercase fs-1 fw-bold">Write Your Own Stories And Share it with Everyone!</h1>
                        <p className="mt-4 text-muted">Welcome to StoryScape, where every click opens a door to a new world of stories. Dive into a universe of imagination, where words paint vivid landscapes and characters come to life with every turn of the page. Whether you're a seasoned reader or just starting your literary journey, StoryScape offers something for everyone. Explore genres, discover new authors, and immerse yourself in tales that will capture your heart and mind. Join our community of storytellers and readers, and embark on an adventure that knows no bounds. Start your journey today with StoryScape where stories await at every corner.</p>
                        <Link to="/write"><button className="btn btn-info px-3 my-3 fw-bold text-white">Write a Story</button></Link>
                    </div>
                </div>
            </div>

            <div className="my-5">

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="text-center">
                            <h2 className="fw-bold mb-5">Latest Stories</h2>
                        </div>
                    </div>
                </div>

                {
                    data.status === 'loading' && (
                        <div className="text-center mt-5">
                            <h3 className="text-secondary fw-bold fs-4">
                                Loading...
                            </h3>

                        </div>
                    )
                }

                {
                    data.status === 'error' && (
                        <div className="text-center mt-5">
                            <h3 className="text-secondary fw-bold fs-4">
                                Oops something went wrong.
                            </h3>

                        </div>
                    )
                }
                
                <div className="row">
                    {
                        data.status === 'success' && data.stories.map((story: any) => {
                            console.log(story._id)
                            return (
                            <div className="col-md-6 col-lg-4 text-center text-decoration-none">
                                <div className="shadow rounded">
                                    <img src={story.poster ? `http://localhost:5000/${story.poster}` : DefaultPoster} alt={story.title} height="300px" width="200px" />
                                </div>
                                <h2 className="lead fw-bold my-4">{story.title}</h2>
                                <Link to={`/story/${story._id}`}><button className="btn btn-info text-white lead fw-bold mb-5">Read Story</button></Link>
                            </div>
)})
                    }
                   
                </div>
            </div>
        </div>
  )
}

export default Home