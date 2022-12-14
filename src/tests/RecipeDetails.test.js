import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { mockFetchRecipes } from './mocks/mockFetchRecipes';
import App from '../App';

const URL = '/meals/52977';
const RECIPE_PHOTO = 'recipe-photo';
const FAVORITE_BUTTON = 'favorite-btn';
const START_BUTTON = 'start-recipe-btn';
const BLACK_HEART = 'blackHeartIcon.svg';

const expectPhoto = async () => {
  await waitFor(() => expect(
    screen.getByTestId(RECIPE_PHOTO),
  ).toBeInTheDocument(), { timeout: 5000 });
};

describe('Testa o componente <RecipeDetails />', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetchRecipes),
    }));
  });
  test('Testa se a receita com meal e renderizada corretamente', async () => {
    renderWithRouter(<App />, { initialEntries: [URL] });
    await expectPhoto();
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId(FAVORITE_BUTTON)).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId('0-recommendation-card')).toBeInTheDocument();
    expect(screen.getByTestId(START_BUTTON)).toBeInTheDocument();
  });

  test('testa se com drinks renderiza corretamente', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks/15997'] });
    await expectPhoto();
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId(FAVORITE_BUTTON)).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('0-recommendation-card')).toBeInTheDocument();
    expect(screen.getByTestId(START_BUTTON)).toBeInTheDocument();
  });

  test('Testa se o botao de favoritos ja vem favoritado e se pode favoritar', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      alcoholicOrNot: '',
      category: 'Side',
      id: '52977',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      nationality: 'Turkish',
      type: 'meal',
    }]));
    renderWithRouter(<App />, { initialEntries: [URL] });
    await expectPhoto();
    expect(screen.getByTestId(FAVORITE_BUTTON)).toHaveAttribute('src', BLACK_HEART);
    userEvent.click(screen.getByTestId(FAVORITE_BUTTON));
    expect(screen.getByTestId(FAVORITE_BUTTON)).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(screen.getByTestId(FAVORITE_BUTTON));
    expect(screen.getByTestId(FAVORITE_BUTTON)).toHaveAttribute('src', BLACK_HEART);
  });

  test('testa se pode favoritar sem nada no localStorage', async () => {
    localStorage.clear();
    renderWithRouter(<App />, { initialEntries: [URL] });
    await expectPhoto();
    expect(screen.getByTestId(FAVORITE_BUTTON)).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(screen.getByTestId(FAVORITE_BUTTON));
    expect(screen.getByTestId(FAVORITE_BUTTON)).toHaveAttribute('src', BLACK_HEART);
  });

  test('testa se o botao nao apareca caso a receita ja esteja feita', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify([{
      alcoholicOrNot: '',
      category: 'Side',
      id: '52977',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      type: 'meal',
      area: 'Turkish',
      doneDate: '23/06/2020',
      tags: ['Soup'],
    }]));
    renderWithRouter(<App />, { initialEntries: [URL] });
    await expectPhoto();
    expect(screen.queryByTestId(START_BUTTON)).not.toBeInTheDocument();
  });

  test('testa se, caso a receita esteja em progresso, o botao apareca', async () => {
    localStorage.clear();
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {
        52977: ['Corba'],
      },
    }));
    renderWithRouter(<App />, { initialEntries: [URL] });
    await expectPhoto();
    expect(screen.getByTestId(START_BUTTON)).toHaveTextContent('Continue Recipe');
  });

  test('testa se o botao de Iniciar receita funciona', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [URL] });
    await expectPhoto();
    userEvent.click(screen.getByTestId(START_BUTTON));
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52977/in-progress'), { timeout: 3000 });
  });

  test('testa o botao share', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });
    const mockData = 'http://localhost/meals/52977';
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
    await expectPhoto();
    userEvent.click(screen.getByTestId('share-btn'));
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      mockData,
    );
  });
});
