import React, { PureComponent } from "react";
import {Button , Row, Col,Progress } from 'reactstrap';
import Endpoints from '../../api';
import axios from 'axios';

class PersonalDetailForm extends PureComponent {
    constructor(){
        super();
        this.state = {
            dateType:'text',
            id_proof:'',
            id_number:'',
            id_image:'',
            address_image:null,
            bank_image:null,
            ifsc:'',
            account_number:null,
            urls:[],
            id_image_percent : 0,
            address_image_percent : 0,
            bank_image_percent : 0,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    UploadDocument = async (file_type,file) => {

        let bodyData = {
          bucketName: "kycverficationdocuments",
          fileName: this.props.match.params.user_id + "/" + file_type +'.jpg'
        }
        const options = {
            onUploadProgress: (progressEvent) =>{
                const {loaded,total} = progressEvent
                let percent = Math.floor((loaded*100)/total);
                this.setState({[file_type + '_percent']:percent})
            }
        }
        try{
            let resp = await axios.post(Endpoints.GET_PRESIGNED_LINK, bodyData);
            let preSignedUrl = JSON.parse(resp.data.body);
            resp = await axios.put(preSignedUrl.URL, file,options);
            if (resp.config.url) {
                  let uploadURL = resp.config.url.split("?")[0];
                console.log("resp",uploadURL);
                return 1
            }
        }catch(err){
            console.log("err",err);
        }
        return 0;
      }

    handleChange = async(e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleFileChange = async(e) =>{
        this.setState({
            [e.target.name + '_percent']:1
        })
        try{
           let resp = await this.UploadDocument(e.target.name,e.target.files[0])
            if (resp){
                this.setState({
                    [e.target.name]: URL.createObjectURL(e.target.files[0]),
                    [e.target.name + '_percent']:0
                })
            }
        }catch(err){
            this.setState({
                [e.target.name + '_percent']:0
            })
        }
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const {id_proof,id_number,ifsc,account_number,address_proof,bank_proof} = this.state;
        const body = {
            idProof:id_number,
            idType:id_proof,
            IFSC : ifsc,
            accountNumber: account_number,
            userId: this.props.match.params.user_id
        }
        try{
           let resp = axios.post(Endpoints.UPLOAD_KYC_DETAIL,body)
            if(resp){
                console.log('submitted successfully')
            }
        }catch(err){
            console.log(err);
        }
    }

    render(){
    const {id_number,id_image,address_image,ifsc,account_number,bank_image,percent,id_image_percent,address_image_percent,bank_image_percent} = this.state;
    return (
        <>
      <div>
            <div className="pd-form-heading">
            Select Govement ID Proof
            </div>
                <Row xs="1" sm="2" md="2" style={{maxWidth:"440px"}}>
                        <Col>
                            <select className="detail-form-input" name="id_proof" onChange = {this.handleChange} required >
                                <option value="" disabled selected>Select ID proof...</option>
                                <option value="PAN CARD">PAN CARD</option>
                                <option value="AADHAR CARD">AADHAR CARD</option>
                            </select>
                        </Col>
                        <Col>
                            <input className="detail-form-input" name="id_number" value={id_number} onChange = {this.handleChange} placeholder="Enter Card Number" />
                        </Col>
                </Row>
                <Row xs="1" className="file_upload">
                    <Col >
                    <input type="file" id="id_image" name="id_image" accept="image/*"  onChange={this.handleFileChange}/>
                    <label for="id_image" >+ Upload Government Identity Proof</label>
                    {id_image_percent>0 && id_image_percent<100 && <Progress animated value={id_image_percent} style={{width:"80%",height:"8px"}}/>}
                    {id_image &&
                        <div className="proof_image">
                            <img src = {id_image} width="75%" height="160px" alt="file"/>
                        </div>
                    }
                    </Col>
                </Row>

            <div className="pd-form-heading" style={{marginTop:"1rem"}}>
            Address Details
            </div>
            <Row xs="1" sm="2" md="2" style={{maxWidth:"400px"}}>
                    <Col>
                        <select className="detail-form-input" name="address_proof" onChange = {this.handleChange} required >
                            <option value="" disabled selected>Select Address Proof</option>
                            <option value="PAN CARD">PAN CARD</option>
                            <option value="AADHAR CARD">AADHAR CARD</option>
                        </select>
                    </Col>
            </Row>
            <Row xs="1" className="file_upload">
                <Col>
                    <input type="file" id="address_image" name="address_image" accept="image/*"  onChange={this.handleFileChange}/>
                    <label for="address_image" >+ Upload Address Detail proof</label>
                    {address_image_percent>0 && address_image_percent<100 && <Progress animated value={address_image_percent} style={{width:"80%",height:"8px"}}/>}
                {address_image &&
                    <div className="proof_image">
                        <img src = {address_image} width="75%" height="160px" alt="file"/>
                    </div>
                }
                </Col>
            </Row>
            <div className="pd-form-heading" style={{marginTop:"1rem"}}>
                Add Bank Details
            </div>
            <Row xs="1" sm="2" md="3" style={{maxWidth:"660px"}}>
                    <Col>
                        <select className="detail-form-input" name="bank_proof" onChange = {this.handleChange} required >
                            <option value="" disabled selected>Select your Bank</option>
                            <option value="SBI">State Bank Of India</option>
                            <option value="CBI">Central Bank of India</option>
                        </select>
                    </Col>
                    <Col>
                        <input className="detail-form-input" name="account_number" value={account_number} onChange = {this.handleChange} placeholder="Bank Account Number" />
                    </Col>
                    <Col>
                        <input className="detail-form-input" name="ifsc" value={ifsc} onChange = {this.handleChange} placeholder="IFSC" />
                    </Col>
            </Row>
            <Row xs="1" className="file_upload">
                <Col >
                <input type="file" id="bank_image" name="bank_image" accept="image/*"  onChange={this.handleFileChange}/>
                <label for="bank_image" >+ Upload Bank detail proof</label>
                {bank_image_percent>0 && bank_image_percent<100 && <Progress animated value={bank_image_percent} style={{width:"80%",height:"8px"}}/>}
                {bank_image &&
                    <div className="proof_image">
                        <img src = {bank_image} width="75%" height="160px" alt="file"/>
                    </div>
                }
                </Col>
            </Row>
            <div style={{marginTop:"1rem",textAlign:"center",marginRight:"17%"}}>
                <Button color="primary" style={{width:"200px"}} onClick={this.handleSubmit}>Submit</Button>
            </div>
      </div>
      </>
    );
  }
}

export default PersonalDetailForm;
