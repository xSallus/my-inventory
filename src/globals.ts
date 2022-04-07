import styled, { createGlobalStyle } from 'styled-components'

const GlobalCSS = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
		box-sizing: border-box;
    font-family: -apple-system, Roboto, sans-serif;
		color: #f0f2f5;
  }

  a {
    text-decoration: none;
  }

	button {
		cursor: pointer;
	}
`

const HomeContainer = styled.main`
  height: 100vh;
	width: 100vw;

  display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	gap: 7rem;

	background: url("/icons/heavy_box.svg") no-repeat;
	background-color: #0c0c0c;
	background-position: bottom;

	& > button:hover {
		filter: brightness(0.8);
	}

	& > h1 {
		margin-top: 15rem;
	}

	& .login-button {
		background: #55f;
		border: 0;
		border-radius: 6px;
		width: 12rem;
		height: 3rem;

		font-size: 1.2rem;
		font-weight: medium;
	}

	& button.close-button {
		height: 2rem;
		width: 2rem;

		background: transparent;
		border: 1px solid red;
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		& > span  {
			line-height: 1rem;
			color: red;
		}
	}

	@media(max-width: 860px) {
		background-size: contain;
	}

	@media(min-width: 1024px) {
		padding-left: 12rem;
		align-items: flex-start;
		background-position: center right;
	}
`

const DashboardContainer = styled.main`
  height: 100vh;
	width: 100vw;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #0c0c0c;
 `

export { GlobalCSS, HomeContainer, DashboardContainer }
