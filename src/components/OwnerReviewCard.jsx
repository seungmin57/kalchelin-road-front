import { Link } from 'react-router-dom';
import { API_BASE } from '../api';

function OwnerReviewCard({ review }) {
    return (
        <article className='card'>
            <div className='meta'>
                OWNER · {review.createdAt?.slice(0,10)}
            </div>
            {review.imageUrl ? (
                <img 
                    className='thumb'
                    src={`${API_BASE}${review.imageUrl}`}
                    alt={review.title}
                />
            ) : (
                <div className="thumb-empty">이미지 없음</div>
            )}

            <h3 style={{ marginTop:10 }}>
                <Link to={`/owner-reviews/${review.id}`}>{review.title}</Link>
            </h3>
            <div className='rating'>* {review.rating}</div>
        </article>
    );
}

export default OwnerReviewCard;