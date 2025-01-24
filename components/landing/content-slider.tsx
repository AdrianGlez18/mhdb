import { getTMDBTrendingList } from "@/lib/utils";
import "@/styles/content-slider.css"

const ContentSlider = async () => {
    const response     = await getTMDBTrendingList('movie', 1);
    return (
        <div className='content-slider'>
            <div className="list-of-contents">
                {
                    response.results.map((item: any, index: number) => (
                        <div className="content-img" style={{ "--content-position": index } as React.CSSProperties}><img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} alt="" /></div>
                    ))
                }
            </div>
        </div>
    )
}

export default ContentSlider