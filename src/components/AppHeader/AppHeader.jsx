import headerStyles from './AppHeader.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <button className={`${headerStyles.button} pl-5 pr-5 pb-4 pt-4`}>
          <BurgerIcon type='primary'/>
          <p className='text text_type_main-default'>Конструктор</p>
        </button>
        <button className={`${headerStyles.button} pl-5 pr-5 pb-4 pt-4`}>
          <ListIcon type='secondary'/>
          <p className='text text_type_main-default text_color_inactive'>Лента заказов</p>
        </button>
      </nav>
      <Logo/>
      <button className={`${headerStyles.button} ${headerStyles.profile_button}`}>
        <ProfileIcon type='secondary'/>
        <p className='text text_type_main-default text_color_inactive'>Личный кабинет</p>
      </button>
    </header>
  );
}

export default AppHeader;
