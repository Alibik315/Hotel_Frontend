import * as React from 'react';
import Feedback from './../../Comment/Feedback';

import {
	Avatar,
	Link,
	Grid,
	Box,
	Button,
	Typography,
	Container,
	Divider,
	TextField,
	CircularProgress
} from '@mui/material';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import LocalTaxiRoundedIcon from '@mui/icons-material/LocalTaxiRounded';
import ChairRoundedIcon from '@mui/icons-material/ChairRounded';
import ShowerRoundedIcon from '@mui/icons-material/ShowerRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import SignalWifi4BarLockRoundedIcon from '@mui/icons-material/SignalWifi4BarLockRounded';
import RoomServiceRoundedIcon from '@mui/icons-material/RoomServiceRounded';
import TvRoundedIcon from '@mui/icons-material/TvRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import BedroomChildRoundedIcon from '@mui/icons-material/BedroomChildRounded';
import AlarmIcon from '@mui/icons-material/Alarm';
import CheckIcon from '@mui/icons-material/Check';
import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import '../../../css/Hotelpage2.css';
import { srLatn } from 'date-fns/locale';
import Image1 from '../../../statics/img/room1.jpg';
import Image2 from '../../../statics/img/room2.jpg';
import Image3 from '../../../statics/img/room3.jpg';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import StarIcon from '@mui/icons-material/Star';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { cookies, makeURL, set_cookie } from '../../../Utils/common';
import references from '../../../assets/References.json';
import Roomcard from './Roomcard';
import ResponsiveDatePickers from '../../HotelPage/ResponsiveDatePickers';

const labels = {
	0.5: 'Useless',
	1: 'Useless+',
	1.5: 'Poor',
	2: 'Poor+',
	2.5: 'Ok',
	3: 'Ok+',
	3.5: 'Good',
	4: 'Good+',
	4.5: 'Excellent',
	5: 'Excellent+'
};

const Icons = {
	'Taxi service': <LocalTaxiRoundedIcon />,
	Sofa: <ChairRoundedIcon />,
	Bathroom: <ShowerRoundedIcon />,
	Telephone: <PhoneRoundedIcon />,
	WiFi: <SignalWifi4BarLockRoundedIcon />,
	'Room service': <RoomServiceRoundedIcon />,
	Television: <TvRoundedIcon />,
	Gym: <FitnessCenterRoundedIcon />,
	Restaurant: <RestaurantMenuRoundedIcon />,
	Bar: <LocalBarIcon />
};

export default function Hotelpage(props) {
	const value = 3.5;

	// const { hotelid } = useParams();
	const [ hotel, setHotel ] = useState(null);
	const [ facility, setFacility ] = useState(null);
	const [ roomimg, setRoomimg ] = useState(null);
	const [ f1, setf1 ] = useState(null);
	const [ f2, setf2 ] = useState(null);
	const [ rooms, setRooms ] = useState(null);
	const [ checkin, setCheckin ] = useState('');
	const [ checkout, setCheckout ] = useState('');
	const [ datein, setdatein ] = useState('');
	const [ dateout, setdateout ] = useState('');
	const [ num, setnum ] = useState('');

	useEffect(() => {
		

		const queryString = window.location.toString();
		const hotelid = queryString.slice(-1);
		axios
			.get(makeURL(references.url_one_hotel + hotelid + '/'), {
				headers: {
					Authorization: cookies.get('Authorization')
				}
			})
			.then((response) => {
				console.log('this request is for hotel facilities:', response.data);
				setHotel(response.data);
				setFacility(response.data.facilities);
				setf1(response.data.facilities.slice(0, 4));
				setf2(response.data.facilities.slice(4, 8));
				setCheckin(response.data.check_in_range);
				setCheckout(response.data.check_out_range);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		const queryString = window.location.toString();
		const hotelid = queryString.slice(-1);

		setRooms(JSON.parse(localStorage.getItem('rooms')));

		axios
			.get(makeURL(references.url_hotelrooms + hotelid + '/'), {
				headers: {
					Authorization: cookies.get('Authorization')
				}
			})
			.then((response) => {
				console.log('rooms response:', response.data);
				setRooms(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return hotel ? (
		<div>
			<Helmet bodyAttributes={{ style: 'background-color : #f5f5f5' }} />
			<div className="container">
				<div className="row mt-5">
					<div className="col-lg-4">
						<ResponsiveDatePickers id={props.id} />
					</div>

					<div className="col-lg-8">
						<div className="row">
							<h3 className="mb-3 mt-3">Facilities of the hotel</h3>
							<div className="col">
								<div className="mb-3 row">
									<div className="col">
										{f1 ? (
											f1.map((f) => (
												<div className="mb-3 row">
													<div className="col">{f.name}</div>
													<div className="col">{Icons[f.name]}</div>
												</div>
											))
										) : null}
									</div>
									<div className="col">
										{f2 ? (
											f2.map((f) => (
												<div className="mb-3 row">
													<div className="col">{f.name}</div>
													<div className="col">{Icons[f.name]}</div>
												</div>
											))
										) : null}
									</div>
								</div>
							</div>
						</div>
						<button
							type="button"
							className="mb-3 btn btn-secondary room-facilities"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal"
						>
							See all facilities
						</button>
						<div
							className="modal fade"
							id="exampleModal"
							tabindex="-1"
							aria-labelledby="AllFacilities"
							aria-hidden="true"
						>
							<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="AllFacilities">
											Facilities of the hotel
										</h5>
										<button
											type="button"
											className="btn-close"
											data-bs-dismiss="modal"
											aria-label="Close"
										/>
									</div>
									<div className="modal-body">
										<div className="container">
											{facility ? (
												facility.map((f) => (
													<div className="mb-3 row">
														<div className="col">{f.name}</div>
														<div className="col" style={{ textAlign: 'right' }}>
															{Icons[f.name]}
														</div>
													</div>
												))
											) : null}
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="">
							<hr className="mb-0 mt-0 hr-text" />
						</div>

						<h3 className="mb-3 mt-3">Available rooms</h3>
						{rooms ? (
							rooms.map((r) => (
								<Roomcard
									datein={datein}
									dateout={dateout}
									num={num}
									name={r.hotel_info.name}
									city={r.hotel_info.city}
									id={r.id}
									option={r.option}
									price={r.price}
									sleeps={r.sleeps}
									type={r.type}
									roomfacilities={r.room_facilities}
									size={r.size}
								/>
							))
						) : null}
						<div className="">
							<hr className="mb-0 mt-0 hr-text" />
						</div>

						<div className="row mt-3 mb-3">
							<h3 className="mb-3 mt-3 ms-1">Hotel rules</h3>
							<div className="mb-3 ms-3 me-2 card rule-card" style={{ width: '15rem' }}>
								<div className="card-body">
									<h6 className="card-subtitle mb-2 text-muted">
										<AlarmIcon fontSize="large" />
									</h6>
									<h5 className="card-title">Check in time</h5>
									<p className="card-text">{checkin}</p>
								</div>
							</div>
							<div className="mb-3 card rule-card" style={{ width: '15rem' }}>
								<div className="card-body">
									<h6 className="card-subtitle mb-2 text-muted">
										<AlarmIcon fontSize="large" />
									</h6>
									<h5 className="card-title">Check out time</h5>
									<p className="card-text">{checkout}</p>
								</div>
							</div>
						</div>

						<div className="">
							<hr className="mb-0 mt-0 hr-text" />
						</div>

						{/* <br></br>
<br></br> */}
						<br />

						<div className="col d-inline-flex">
							<h5>Feedback and comments</h5>
							<Box
								sx={{
									width: 200,
									display: 'flex',
									alignItems: 'center',
									marginBottom: '10px',
									marginLeft: '5px'
								}}
							>
								<Rating
									name="text-feedback"
									value={value}
									readOnly
									precision={0.5}
									emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
								/>
								<Box sx={{ ml: 2 }}>{labels[value]}</Box>
							</Box>
						</div>

						<Feedback />
					</div>
				</div>
			</div>
		</div>
	) : (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: '45vh'
			}}
		>
			<CircularProgress size="5rem" style={{ color: '#cd9a2d' }} />
		</Box>
	);
}
