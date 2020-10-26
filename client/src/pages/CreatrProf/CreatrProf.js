import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { QUERY_CREATORS } from '../../utils/queries';
import { updateCreators } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { BiPlay, BiPlusMedical } from 'react-icons/bi';

import './CreatrProf.css';
import spinner from '../../assets/cool_spinner.gif';

const CreatrProf = () => {
	// cache redux store
	const state = useSelector((state) => state);
	// destructure required variable
	const { creators } = state;
	// cache redux method to update store
	const dispatch = useDispatch();

	// get creatpr id from url which was appended by Link wrapping CreatrTile components
	const { id } = useParams();

	// initialize ref to audio player
	const playerRef = useRef(null);

	// initiate component level state to keep track of current creator
	const [ curCreatr, setCurCreatr ] = useState({});

	// make db query to get all creators, in case page is refreshed or user has not first visited landing page to initiate redux store from db
	const { loading, data } = useQuery(QUERY_CREATORS);

	// this will be called after initial render and each time one of the values in the dependency array (creators, data, loading, dispatch, id, curCreatr) changes. checking the redux store first
	useEffect(
		() => {
			// if creators are already in global store
			if (creators.length) {
				// update component level state of curCreatr to be the creator object from the redux store whose id matches the one from the url
				setCurCreatr(creators.find((creator) => creator._id === id));
			} else if (data) {
				// if nothing was in global store, if there is any data retrieved from db on server, dispatch the action to update the creators in the global store with the data from the db
				dispatch(updateCreators(data.creators));
				// also, cache the products from the db in indexedDb
				data.creators.forEach((creator) => {
					idbPromise('creators', 'put', creator);
				});
			} else if (!loading) {
				// otherwise, if there is nothing in the redux store, and there is no internet connection (hence 'loading' is undefined in the useQuery() hook) get all the data from the cache in idb
				idbPromise('creators', 'get').then((indexedCreators) => {
					// use data from indexedDb to update redux global store for offline browsing
					dispatch(updateCreators(indexedCreators));
				});
			}
		},
		// [ creators, data, loading, dispatch, id, curCreatr(?) ]
		[ creators, data, loading, dispatch, id ]
	);

	const handlePlaySong = (songUrl) => {
		playerRef.current.setAttribute('controlsList', 'nodownload');
		playerRef.current.setAttribute('src', songUrl);
		playerRef.current.play();
	};

	return (
    <React.Fragment>
    {curCreatr ? (
      <div className="CreatrProf vh-100">
        <h1 className="w-100 my-5 text-center">{curCreatr.stageName}</h1>
        <Row className="mt-4 d-flex justify-content-center ">
          <Col lg={5}>
            <div className="w-100 bskr-bg-secondary pt-2 mb-3 rounded">
              <Card className="w-75 mx-auto bskr-bg-secondary">
                <Card.Img variant="top" className="w-75 mx-auto rounded"src={curCreatr.imgUrl} />
                <Card.Body className="text-center">
                  <Card.Text className="text-white text-center">
                {curCreatr.location}
              </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="bskr-bg-secondary rounded p-4 text-center">
              <p className="text-left">{curCreatr.bio}</p>
            </div>
          </Col>
          <Col lg={5} className="d-flex flex-column align-items-center">
            <div className="bskr-bg-secondary w-100 mb-3 py-5 rounded d-flex flex-column align-items-center">
              <h5 className="text-dark">Vibes</h5>
              <ul>
                {curCreatr.vibes &&
                  curCreatr.vibes.map((vibe) => (
                    <span
                      key={vibe._id}
                      className="bskr-vibe-btn-static  btn-sm mx-1 text-white"
                    >
                      {vibe.name}
                    </span>
                  ))}
              </ul>
            </div>
            <div className="bskr-bg-secondary w-100 p-5 d-flex flex-column align-items-center rounded">
              <h4 className="text-dark">Available Tunes</h4>
              <ul className="w-100">
                {curCreatr.songs &&
                  curCreatr.songs.map((song) => (
                    <li
                      key={song._id}
                      className="bskr-bg-search w-100 m-2 p-2 rounded text-dark"
                    >
                      <BiPlay
                        className="fs-3"
                        onClick={() =>
                          handlePlaySong(song.songUrl)}
                      />{' '}
                      <BiPlusMedical className="mr-1" />{' '}
                      {song.title}
                    </li>
                  ))}
              </ul>
              <div className="">
                <audio ref={playerRef} controls>
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    ) : null}
    {loading ? <img src={spinner} alt="loading" /> : null}
  </React.Fragment>
	);
};

export default CreatrProf;
