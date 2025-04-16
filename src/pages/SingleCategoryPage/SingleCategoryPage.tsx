import s from './SingleCategoryPage.module.css'
import { Poster } from '../../components/Poster/Poster'
import { SidebarContainer } from '../../components/Sidebar/SidebarContainer'
import { Layout } from '../../widgets/Layout/Layout'
import { SingleCategoryContainer } from '../../components/SingleCategory/SingleCategoryContainer'

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
