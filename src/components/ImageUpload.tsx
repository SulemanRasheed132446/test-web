import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { RootState } from '../store/Index';
import { StudentImageUpdate } from '../store/student/Actions';

interface ImageUploadState {
    images?:any,
    setImages?:any,
    maxNumber?:number,
    getImage?:boolean
}
export type OwnUpdateImageFormProps = {
  StudentImageUpdate:(student:any, url:any)=>void;
  postImage?:any;
  URLLink?:any;
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
        const { URLLink } = this.props
        this.setState({setImages: imageList, getImage:true})
        if(imageList[0].file){
          const file = imageList[0].file
           const formData = new FormData();
           formData.append('file', file);
           this.props.StudentImageUpdate(formData, URLLink);
         }
      };
    render() {
        const { images, setImages, maxNumber, getImage } = this.state;
        return (
            <div>
                <div>
                <div className="ml-3">
                  {getImage ?
                  <span>
                  {setImages.map((image:any, index:any) =>( 
                    <div key={index} className="image-item">
                      <img src={image['data_url']} alt="" className="multiImage" />
                    </div>
                   
                  ))}
                  </span>                  
                  :
                  <span>
                    <img src='../assets/img/image.png' alt="" className="multiImage" />
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
                                <div className="upload__image-wrapper ml-2">
                                  <Link to={'#'} title="Upload"
                                  className="btn btn-circle btn-info mb-3"
                                    style={isDragging ? { color: 'red' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                  >Upload
                                     <i className="fa fa-file-image-o" aria-hidden="true"></i>
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

export default connect(mapStateToProps, { StudentImageUpdate })(ImageUpload)