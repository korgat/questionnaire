import NavigationPanel from '@/components/layout/QuestionnaireLayout/NavigationPanel'

export default function StudioLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <NavigationPanel>{children}</NavigationPanel>
}
