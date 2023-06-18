import axios from 'axios';
import moment from 'moment/moment';
import { useEffect, useState } from 'react'  
import { Alert, Col, Container, Row, Table } from 'react-bootstrap';
import videoloop from '../src/videoloop.mp4';

function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [preBidConferences, setPreBidConferences] = useState([]);
  const [openingOfBids, setOpeningOfBids] = useState([]);

const getBacActivities = () => {
  axios.get('http://127.0.0.1:8000/api/contract_schedule/bidding')
  .then(res => {
      // console.log(res.data.pre_bid_conference[0])
      setPreBidConferences(res.data.pre_bid_conference)
      setOpeningOfBids(res.data.opening_of_bids)
  })
}
  
useEffect(()=>{
  getBacActivities()
  setInterval(() => setCurrentDateTime(new Date()), 1000)
}, [])

  return (
    <Container fluid>
      <h1 className='text-center'><b>Digital Information Board</b></h1>
        <Row className='mt-1'>
            <video autoPlay loop={true} muted className='col-lg-10'>
                    <source src={videoloop} type='video/mp4' />
            </video>
            <Col style={{backgroundColor: '#d87000'}}>
                <h1 className='text-center'>BAC Activities</h1>
                <Row className='h-50'>
                    <Col lg={12}>
                        <Table>
                            <thead style={{backgroundColor: '#aaa'}}>
                                <tr>
                                    <th className='text-center'>Pre-Bid Conference</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        !preBidConferences ?
                                        <h3>loading...</h3> :
                                        // console.log(preBidConferences)
                                        preBidConferences.map((preBidConference) => {
                                            return(
                                                <Alert variant='secondary' style={{marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5}}>
                                                    <p style={{marginBottom: 0, paddingTop: 0, paddingBottom: 0}} className='text-center'><b>{preBidConference.contract_id}</b> <small>Today{moment(preBidConference.pre_bid_schedule).format(' @ hh:mm a')}</small></p>
                                                    <p style={{marginBottom: 0, paddingTop: 0, paddingBottom: 0, fontSize: 10}} className='text-left'>
                                                        <small>{preBidConference.title}</small>
                                                    </p>
                                                </Alert>
                                            )
                                        })
                                    }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Table>
                            <thead style={{backgroundColor: '#aaa'}}>
                                <tr>
                                    <th className='text-center'>Opening of Bids</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !openingOfBids ?
                                    <h3>loading...</h3> :
                                    // console.log(openingOfBids)
                                    openingOfBids.map((openingOfBid) => {
                                        return(
                                            <Alert variant='secondary' style={{marginTop: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5}}>
                                                <p style={{marginBottom: 0, paddingTop: 0, paddingBottom: 0}} className='text-center'><b>{openingOfBid.contract_id}</b> <small>Today{moment(openingOfBid.opening_of_bids_schedule).format(' @ hh:mm a')}</small></p>
                                                <p style={{marginBottom: 0, paddingTop: 0, paddingBottom: 0, fontSize: 10}} className='text-left'>
                                                    <small>{openingOfBid.title}</small>
                                                </p>
                                            </Alert>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col lg={12} className='mt-3' style={{padding: 0}}>
                <Alert variant='primary' style={{paddingTop: 0, paddingBottom: 0, marginBottom: 0, borderRadius: 0, backgroundColor: '#0d0963', padding: 0}}>
                    <h1 className='text-center' style={{marginBottom: 0, color: 'white'}}>
                        <b style={{fontSize:100}}>{moment(currentDateTime).format('MMMM D, yyyy (dddd)')} - {currentDateTime.toLocaleTimeString()}</b>
                    </h1>
                </Alert>
            </Col>
        </Row>
    </Container>
  )
}

export default App
