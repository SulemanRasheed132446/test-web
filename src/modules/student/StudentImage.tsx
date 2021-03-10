import React, { Component } from 'react';
import { connect } from 'react-redux'
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/Index';
import { StudentImageUpdate } from '../../store/student/Actions';
import { STUDENTS } from '../../services/Config';

interface ImageUploadState {
    images?:any,
    setImages?:any,
    maxNumber?:number,
    getImage?:boolean
}
export type OwnUpdateImageFormProps = {
  StudentImageUpdate:(student:any, url:any)=>void;
  postImage:any
}
export class ImageUpload extends Component<OwnUpdateImageFormProps, ImageUploadState> {
    constructor(props: any) {
        super(props);
        this.state = {
            images:[],
            setImages:[],
            maxNumber:65,
            getImage:false
        }
    }
      onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
      ) => {
        this.setState({setImages: imageList, getImage:true})
        if(imageList[0].file){
         const file = imageList[0].file
          const formData = new FormData();
          formData.append('file', file);
          this.props.StudentImageUpdate(formData, STUDENTS.STUDNETSIMAGEUPDATE);
        }
      };
    render() {
        const { images, setImages, maxNumber, getImage } = this.state;
        return (
            <div>
                <div className="row">
                <div className="ml-3 mt-3">
                  {getImage ?
                  <span>
                  {setImages.map((image:any, index:any) =>( 
                    <div key={index} className="image-item">
                      <img src={image['data_url']} alt="" className="studentImage" />
                    </div>
                   
                  ))}
                  </span>                  
                  :
                  <span>
                    {this.props.postImage ? 
                    <img src={`${process.env.REACT_APP_API_URL}${this.props.postImage}`} alt="" className="studentImage" />
                    : <img src='../assets/img/user/teacher-profile.jpg' alt="" className="studentImage" />}
                  </span>
                  }
                   </div>
                </div>
                 <ImageUploading
                              value={images}
                              onChange={this.onChange}
                              maxNumber={maxNumber}
                              dataURLKey="data_url"
                            >
                              {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                              }) => (
                                // write your building UI
                                <div className="upload__image-wrapper">
                                  <Link  to={'#'} title="Upload"
                                  className="btn btn-circle btn-info mb-3"
                                    style={isDragging ? { color: 'red' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                  >Upload <i className="fa fa-file-image-o" aria-hidden="true"></i>
                                  </Link>                              
                                  </div>
                              )}
                            </ImageUploading>
            </div>
        )
    }
}

const mapStateToProps = ({student, classes}: RootState) => {
  return {     
      loading:student.loading,
      errorMessage: student.errors
  };
};

export default connect(mapStateToProps, {StudentImageUpdate })(ImageUpload)
