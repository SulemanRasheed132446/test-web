import React from 'react';
import { Link } from 'react-router-dom';
import { UserRoles } from '../../services/Constants'
import { connect } from 'react-redux';
import { ProfileActionTypes } from '../../store/profile/Types'
import { fetchProfilePost } from '../../store/profile/Actions'
import { RootState } from '../../store/Index'
import { LogoutPost } from '../../store/authentication/Actions'

export interface ProfileDetails {
	getProfileDetails?: ProfileActionTypes[];
	fetchProfilePost: () => any;
	LogoutPost: () => void;
}

class Sidenav extends React.Component<ProfileDetails> {
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
		this.props.fetchProfilePost()
		this.checkUserType();
	}
	checkUserType() {
		const getSideToken = localStorage.getItem('usertype');
		if (getSideToken === UserRoles.acadamicAdmin) {
			this.setState({ acadamicAdmin: true })
		} else if (getSideToken === UserRoles.schoolAdmin) {
			this.setState({ schoolAdmin: true })
		} else if (getSideToken === UserRoles.teacher) {
			this.setState({ teacher: true })
		} else if (getSideToken === UserRoles.parent) {
			this.setState({ parent: true })
		}
	}

	render() {

		return (
			<div>
				{/* start page container */}
				<div className="page-container">
					{/* start sidebar menu */}
					<div className="sidebar-container">
						<div className="sidemenu-container navbar-collapse collapse fixed-menu">
							<div id="remove-scroll">
								<ul className="sidemenu page-header-fixed p-t-20" data-keep-expanded="false" data-auto-scroll="true"
									data-slide-speed="200">
									<li className="sidebar-toggler-wrapper hide">
										<div className="sidebar-toggler">
											<span></span>
										</div>
									</li>
									<li className="nav-item start active">
										<Link to={'/dashboard'} className="nav-link nav-toggle">
											<i className="material-icons">dashboard</i>
											<span className="title">Dashboard</span>
										</Link>
									</li>
									<li className="nav-item">
										<Link to={'#'} className="nav-link nav-toggle">
											<i className="fa fa-file-text-o" aria-hidden="true"></i>
											<span className="title">classNamees</span>
										</Link>
									</li>
									<li className="nav-item">
										<Link to={'#'} className="nav-link nav-toggle">
											<i className="fa fa-commenting-o" aria-hidden="true"></i>
											<span className="title">Instant Feedback</span>
										</Link>
									</li>
									<li className="nav-item">
										<Link to={'#'} className="nav-link nav-toggle">
											<i className="fa fa-file-text-o" aria-hidden="true"></i>
											<span className="title">Attendance</span>
										</Link>
									</li>
									<li className="nav-item">
										<Link to={'/notice_board'} className="nav-link nav-toggle">
											<i className="fa fa-commenting-o" aria-hidden="true"></i>
											<span className="title">Notice Board</span>
										</Link>
									</li>
									<li className="nav-item">
										<Link to={'/diary'} className="nav-link nav-toggle">
											<i className="fa fa-book" aria-hidden="true"></i>
											<span className="title">Diary</span>
										</Link>
									</li>
									<li className="nav-item">
										<Link to={'#'} className="nav-link nav-toggle">
											<i className="fa fa-table" aria-hidden="true"></i>
											<span className="title">Quizzes</span>
										</Link>
									</li>
									<li className="nav-item">
										<Link to={'#'} className="nav-link nav-toggle">
											<i className="fa fa-table" aria-hidden="true"></i>
											<span className="title">Question Set</span>
										</Link>
									</li>
									{ this.state.schoolAdmin || this.state.acadamicAdmin ?
									<li className="nav-item">
										<Link to={'#'} className="nav-link nav-toggle">
											<i className="fa fa-user-o" aria-hidden="true"></i>
											<span className="title">Manage</span>
											<span className="arrow"></span>
										</Link>
										<ul className="sub-menu">
											
											{ this.state.schoolAdmin ?
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
												<Link to={'/student'} className="nav-link">  
												<span className="title">Students</span>
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
											</div>												
											: null}
											
											{this.state.acadamicAdmin?
											<div>
											<li className="nav-item">
												<Link to={'/school'} className="nav-link">
													<span className="title">School</span>
												</Link>
											</li>
											<li className="nav-item">
												<Link to={'/user'} className="nav-link">  <span
													className="title">User Manage</span>
												</Link>
											</li>
											</div>
											:null}
											
											
											
										</ul>
									</li>
									:null}
								</ul>
							</div>
						</div>
					</div>
				</div>
				{/* end sidebar menu */}
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
	mapStateToProps, { fetchProfilePost, LogoutPost }
)(Sidenav);