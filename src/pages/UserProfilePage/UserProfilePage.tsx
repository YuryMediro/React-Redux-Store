import { Profile } from '@components/Profile/Profile'
import { SidebarContainer } from '@components/Sidebar/SidebarContainer'
import { Layout } from '@widgets/Layout/Layout'
import s from './UserProfilePage.module.css'

export const UserProfilePage = () => {
	return (
		<section className={s.wrapper}>
			<Layout>
				<div className={s.container}>
					<SidebarContainer />
					<Profile />
				</div>
			</Layout>
		</section>
	)
}
