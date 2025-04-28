import { Poster } from '@components/Poster/Poster'
import { SidebarContainer } from '@components/Sidebar/SidebarContainer'
import { SingleCategoryContainer } from '@components/SingleCategory/SingleCategoryContainer'
import { Layout } from '@widgets/Layout/Layout'
import s from './SingleCategoryPage.module.css'

interface SingleCategoryPageProps {}

export const SingleCategoryPage = ({}: SingleCategoryPageProps) => {
	return (
		<section className={s.wrapper}>
			<Layout>
				<div className={s.container}>
					<SidebarContainer />
					<Poster />
				</div>
				<SingleCategoryContainer />
			</Layout>
		</section>
	)
}
