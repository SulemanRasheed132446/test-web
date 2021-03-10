import React from 'react';
import { Link } from 'react-router-dom';
import { UserRoles } from '../../services/Constants'
import { connect } from 'react-redux';
import { ProfileActionTypes } from '../../store/profile/Types'
import { fetchProfilePost } from '../../store/profile/Actions'
import { RootState } from '../../store/Index'
import { LogoutPost } from '../../store/authentication/Actions'
import Modal from 'react-bootstrap/Modal'
import { TokenValidationPost } from '../../store/profile/Actions';
import { Question } from '../../router/Roles';

export interface ProfileDetails {
	getProfileDetails?: ProfileActionTypes[];
	fetchProfilePost: () => any;
	LogoutPost: () => void;
	TokenValidationPost:() => any;
}

class Topheader extends React.Component<ProfileDetails> {
	public state = {
		acadamicAdmin: false,
		schoolAdmin: false,
		bothData: false,
		teacher: false,
		parent: false,
		showLogout: false
	};

	public closeLogout = () => {
		this.setState({ showLogout: false });
	}

	public ShowLogoutBox = () => {
		this.setState({ showLogout: true });
	}

	componentDidMount(): void {
		this.props.fetchProfilePost();
		this.props.TokenValidationPost();
		this.checkUserType();
	}
	checkUserType() {
		const getTopToken = localStorage.getItem('usertype');
		if (getTopToken === UserRoles.acadamicAdmin) {
			this.setState({ acadamicAdmin: true })
		} else if (getTopToken === UserRoles.schoolAdmin) {
			this.setState({ schoolAdmin: true })
		} else if (getTopToken === UserRoles.teacher) {
			this.setState({ teacher: true })
		} else if (getTopToken === UserRoles.parent) {
			this.setState({ parent: true })
		}
	}

	private LogoutPage() {
		return (
			<div>
				<Modal show={this.state.showLogout}>
					<Modal.Header className="pb-0 pt-0">
						<Modal.Title>Logout</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>Are you sure want to Logout ?</p>
					</Modal.Body>

					<Modal.Footer className="modelboxbutton">
						<button className="btn btn-danger mr-1 ml-1 w-15" onClick={this.props.LogoutPost}>Okay</button>
						<button className="btn btn-default mr-1 ml-1 w-15" onClick={this.closeLogout}>Cancel</button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}

	render() {
		const getProfile = JSON.stringify(this.props.getProfileDetails);
		const profileList = JSON.parse(getProfile);
		const getData = profileList.data;
		let userFirstName;
		let userLastName;
		let userRole;
		if (getData) {
			userFirstName = getData.firstname;
			userLastName = getData.lastname;
			userRole = getData.role;
		}

		return (
			<div>
				{this.LogoutPage()}
				{/* start header */}
				<div className="page-header navbar navbar-fixed-top">
					<div className="page-header-inner ">
						{/* logo start */}
						<div className="page-logo pl-4">
							<Link to="#">
								<i className="fa fa-graduation-cap mr-2" aria-hidden="true"></i>
								<span className="logo-default">DAPS</span> </Link>
						</div>
						{/* logo end */}
						<ul className="nav navbar-nav navbar-left in">
							<li><Link to="#" className="menu-toggler sidebar-toggler"> <i className="fa fa-bars" aria-hidden="true"></i></Link></li>
						</ul>
						{/* start mobile menu */}
						<Link to="#" className="menu-toggler responsive-toggler" data-toggle="collapse"
							data-target=".navbar-collapse">
							<span></span>
						</Link>
						{/* end mobile menu */}
						{/* start header menu */}
						<div className="top-menu">
							<ul className="nav navbar-nav pull-right">
								{/* start manage user dropdown */}
								<li className="dropdown dropdown-user">
									<Link to="#" className="dropdown-toggle mt-1 pr-0" data-toggle="dropdown" data-hover="dropdown"
										data-close-others="true">
										<span className="username username-hide-on-mobile"> 2021 </span>
										<i className="fa fa-angle-down"></i>
									</Link>
									<ul className="dropdown-menu dropdown-menu-default animated jello">
										<li>
											<Link to="#">
												<i className="fa fa-calendar" aria-hidden="true"></i> 2020 </Link>
										</li>
										<li>
											<Link to="#">
												<i className="fa fa-calendar" aria-hidden="true"></i> 2019</Link>
										</li>
									</ul>
								</li>
								<li className="dropdown dropdown-user mr-3">
									<Link to={'#'} className="dropdown-toggle pr-2 pb-0 pt-0" data-toggle="dropdown" data-hover="dropdown"
										data-close-others="true">
										<img alt="" className="img-circle " src="assets/img/profile_small.jpg" />
										<span className="username username-hide-on-mobile mt-1 mr-2 userNameTitle"> {userFirstName} {userLastName}</span>
										<p className="d-block">{userRole} <i className="fa fa-angle-down"></i></p>
									</Link>
									<ul className="dropdown-menu dropdown-menu-default animated jello">
										{/* <li>
								<Link to={'#'}>
										<i className="icon-user"></i> Profile </Link>
								</li> */}
										<li>
											<Link to={'#'} onClick={() => this.ShowLogoutBox()}>
												<i className="icon-logout"></i> Log Out </Link>
										</li>
									</ul>
								</li>
								<li className="dropdown dropdown-quick-sidebar-toggler mt-3 mr-4">
									<Link to={'#'} id="headerSettingButton" className="notificationCount" data-upgraded=",MaterialButton">
										<i className="fa fa-bell-o"></i>
										<span className="badge headerBadgeColor1"> 6 </span>
									</Link>
								</li>
								{/* end manage user dropdown */}

							</ul>
						</div>
					</div>
					<div className="navbar-custom">
						<div className="hor-menu hidden-sm hidden-xs">
							<ul className="nav navbar-nav">
								<li className="mega-menu-dropdown">
									<Link to={'/dashboard'} className="dropdown-toggle">
										<i className="fa fa-tachometer" aria-hidden="true"></i> Dashboard
						</Link>
								</li>
								<li className="mega-menu-dropdown">
									<Link to={'#'} className="dropdown-toggle">
										<i className="fa fa-file-text-o" aria-hidden="true"></i> Classes
							</Link>
								</li>
								<li className="mega-menu-dropdown">
									<Link to={'#'} className="dropdown-toggle"> <i className="fa fa-commenting-o" aria-hidden="true"></i> Instant Feedback
							</Link>
								</li>
								<li className="mega-menu-dropdown">
									<Link to={'#'} className="dropdown-toggle">  <i className="fa fa-file-text-o" aria-hidden="true"></i> Attendance
							</Link>
								</li>
								<li className="mega-menu-dropdown">
									<Link to="/notice_board" className="dropdown-toggle"> <i className="fa fa-commenting-o" aria-hidden="true"></i> Notice Board
							</Link>
								</li>
								<li className="mega-menu-dropdown" >
									<Link to={'/diary'} className="dropdown-toggle">  <i className="fa fa-book" aria-hidden="true"></i> Diary
							</Link>
								</li>
								<li className="mega-menu-dropdown">
									<Link to="#" className="dropdown-toggle"> <i className="fa fa-file-text" aria-hidden="true"></i> Quizzes
							</Link>
								</li>
								{ this.state.schoolAdmin || this.state.teacher ? 
								<li className="mega-menu-dropdown">
									<Link to={Question.ViewQuestion} className="dropdown-toggle">  <i className="fa fa-table" aria-hidden="true"></i> Question Set
							</Link>
								</li>
								:null}
								{ this.state.schoolAdmin || this.state.acadamicAdmin ?
								<li className="mega-menu-dropdown">
									<Link to={'#'} className="dropdown-toggle"> <i className="fa fa-user-o" aria-hidden="true"></i> Manage
								<i className="fa fa-angle-down"></i>
										<span className="selected"></span>
										<span className="arrow open"></span>
									</Link>
									<ul className="dropdown-menu">
										<li>
											<div className="mega-menu-content">
												<div className="row">
													<div className="col-md-12">
														<ul className="mega-menu-submenu">
															{this.state.schoolAdmin?
														<div>
															<li className="nav-item">
																<Link to={'/class'} className="nav-link">
																	<span className="title">Class</span>
																</Link>
															</li>
															<li className="nav-item">
																<Link to={'/teacher'} className="nav-link">  
																<span className="title">Teachers</span>
																	<span className="selected"></span>
																</Link>
															</li>
															<li className="nav-item">
																<Link to={'/student'} className="nav-link">  <span
																	className="title">Students</span>
																</Link>
															</li>
															<li className="nav-item">
																<Link to={'/view_school'} className="nav-link">
																	<span className="title">School</span>
																</Link>
															</li>
															<li className="nav-item">
																<Link to="/subject" className="nav-link ">
																	<span className="title">Subject</span>
																</Link>
															</li>
														</div>:
														null	
														}
														{ this.state.acadamicAdmin ? 
															<div>
															<li className="nav-item">
																<Link to={'/school'} className="nav-link">
																	<span className="title">School</span>
																</Link>
															</li>
															<li className="nav-item">
																<Link to={'/user'} className="nav-link">  <span
																	className="title">User</span>
																</Link>
															</li>
															</div> : null
														}
														</ul>
													</div>
												</div>
											</div>
										</li>
									</ul>
								</li>
								:null}
							</ul>
						</div>
					</div>
				</div>

				{/* end header */}
			</div>
		);
	}
}
const mapStateToProps = ({ schools, login, profile }: RootState) => {
	return {
		getProfileDetails: profile.items
	};
};
export default connect(
	mapStateToProps, { fetchProfilePost, LogoutPost, TokenValidationPost }
)(Topheader);