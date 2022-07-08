import { useEffect, useState } from 'react';

import './Styles/Comment.scss';
import AddComment from './AddComment';
import DeleteModal from './DeleteModal';
import CommentHeader from './CommentHeader';
import CommentFooter from './CommentFooter';
import { commentPostedTime } from '../utils';
import axios from 'axios';
import { cookies, makeURL, set_cookie } from '../../../Utils/common';
import references from '../../../assets/References.json';


import { Rating } from 'react-simple-star-rating';

	


const Comment = ({
	commentData,
	rate,
	time,
	first,
	last,
	avatar,
	hotelid,
	comId,
	editComment,
	commentDelete,
	setDeleteModalState,
	writer
}) => {
	const [editing, setEditing] = useState(false);
	const [content, setContent] = useState(commentData);
	const [ deleting, setDeleting ] = useState(false);
	const [ ratingValue, setRatingValue ] = useState(0);
	const handleRating = (rate) => {
		setRatingValue(rate);
	};

	console.log(avatar);
	const updateComment = () => {

		axios
			.put
				(makeURL('/hotel/' + hotelid + '/' + 'comments/' + comId  +"/" ), {
		
					rate: (ratingValue/20),
					text: content
				},
				{
					headers: {
						Authorization: cookies.get('Authorization')
					}
				}
			)
			.then((response) => {
				console.log(response, 'commnet changed');
			})
			.catch((error) => {
				console.log(error, 'comment change error');
			});

	//   editComment(content, commentData.id, "comment");
	  setEditing(false);
	};

	const deleteComment = (id, type) => {
		const finalType = type !== undefined ? type : 'comment';
		const finalId = id !== undefined ? id : commentData.id;
		commentDelete(finalId, finalType, commentData.id);
		setDeleting(false);
	};

	return (
		<div className={`comment-container ${''}`}>
			<div className="comment">
				<div className="comment--body">
					<CommentHeader
						commentData={commentData}
						rate={rate}
						time={time}
						first={first}
						last={last}
						avatar={avatar}
						setDeleting={setDeleting}
						setDeleteModalState={setDeleteModalState}
						setEditing={setEditing}
						writer={writer}
					/>

					{/* <div className="comment-content">{commentData}</div> */}

					{!editing ? (
            <div className="comment-content">{commentData}</div>
          ) : (
			<div>
			<Rating onClick={handleRating} ratingValue={ratingValue} size={20} />


            <textarea
              className="content-edit-box"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
			</div>
          )}
          {editing && (
            <button className="update-btn" onClick={updateComment}>
              update
            </button>
          )}
		
		
				</div>
				<CommentFooter
					commentData={commentData}
					time={time}
					setDeleting={setDeleting}
					setDeleteModalState={setDeleteModalState}
					// setEditing={setEditing}
				/>
			</div>

			{deleting && (
				<DeleteModal
					hotelid={hotelid}
					comId={comId}

					setDeleting={setDeleting}
					deleteComment={deleteComment}
					setDeleteModalState={setDeleteModalState}
				/>
			)}
		</div>
	);
};

export default Comment;
