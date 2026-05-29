import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode';
import logo from '../../assets/imgs/logo_sem_fundo.png';

const SidebarContainer = styled.aside`
  width: 323px;
  height: 100vh;
  background-color: #F2B924;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  font-family: 'Roboto', sans-serif;

  &.collapsed {
    width: 80px;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 20px;
  flex-shrink: 0;

  .collapsed & {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 10px;
    gap: 15px;
  }
`;

const Logo = styled.img`
  height: 81px;
  object-fit: contain;
  transition: all 0.3s ease;

  .collapsed & {
    height: 40px;
  }
`;

const ToggleButton = styled.button`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px;
  outline: none;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const HamburgerLine = styled.span`
  width: 20px;
  height: 2px;
  background-color: #E1346A;
  border-radius: 2px;
`;

const NavMenu = styled.nav`
  flex: 1;
  padding: 20px 25px;
  overflow-y: auto;

  .collapsed & {
    padding: 15px 10px;
    align-items: center;
  }
`;

const MenuGroup = styled.div`
  margin-bottom: 8px;
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  cursor: pointer;
  border-radius: 8px;
  user-select: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .collapsed & {
    width: 50px;
    height: 50px;
    justify-content: center;
    padding: 12px;
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

const GroupTitle = styled.span`
  color: #E1346A;
  font-weight: 600;
  font-size: 15px;
  white-space: nowrap;

  .collapsed & {
    display: none;
  }
`;

const ExpandIcon = styled.span`
  color: #E1346A;
  font-size: 12px;
  transition: transform 0.3s ease;
  transform: ${props => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};

  .collapsed & {
    display: none;
  }
`;

const IconDisplay = styled.span`
    display: none;
    font-size: 1.5rem;
    .collapsed & {
        display: block;
    }
`;

const Submenu = styled.ul`
  list-style: none;
  max-height: ${props => (props.$isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: rgba(255, 255, 255, 0.05);
  margin: 8px 0 0 0;
  border-radius: 8px;
  padding-left: 0;

  .collapsed & {
    display: none;
  }
`;

const SubmenuItem = styled(NavLink)`
  display: block;
  padding: 12px 24px 12px 40px;
  color: #FFFFFF;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    font-weight: 500;
  }
`;

const LogoutContainer = styled.div`
  padding: 25px;
  flex-shrink: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  justify-content: flex-start;

  &:hover {
    background-color: #FFFFFF;
    color: #F2B924;
  }

  .collapsed & {
    justify-content: center;
  }
`;

const LogoutText = styled.span`
  white-space: nowrap;
  .collapsed & {
    display: none;
  }
`;

const DropdownGroup = ({ title, icon, children, isCollapsed }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <MenuGroup>
            <GroupHeader
                className={isCollapsed ? 'collapsed' : ''}
                onClick={() => setIsOpen(!isOpen)}
                title="Clique para expandir/recolher opções">
                <GroupTitle>{title}</GroupTitle>
                <ExpandIcon $isOpen={isOpen}>▼</ExpandIcon>
                <IconDisplay>{icon}</IconDisplay>
            </GroupHeader>
            <Submenu $isOpen={isOpen} className={isCollapsed ? 'collapsed' : ''}>
                {children}
            </Submenu>
        </MenuGroup>
    );
};

export default function PortalSidebar({ isCollapsed, toggleSidebar }) {
  const navigate = useNavigate();

  const token = localStorage.getItem('user_token');
  let userTipo = 3;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userTipo = decoded.tipo;
    } catch {}
  }
  const isProf = userTipo === 2;

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair do sistema?')) {
        localStorage.removeItem('user_token');
        navigate('/home');
    }
  };

  const menuGroups = [
    { id: 1, title: 'Recados gerais', icon: '📝', submenu: [
        { title: 'Recados', to: '/portal/recados' },
        { title: 'Conteúdos', to: '/portal/conteudos' }
    ]},
    ...(isProf ? [{ id: 2, title: 'Frequência', icon: '📅', submenu: [
        { title: 'Verificar frequência', to: '/portal/frequencia/ver' },
        { title: 'Lançar frequência', to: '/portal/frequencia' }
    ]}] : [{ id: 2, title: 'Frequência', icon: '📅', submenu: [
        { title: 'Verificar frequência', to: '/portal/frequencia/ver' }
    ]}]),
    ...(isProf ? [{ id: 3, title: 'Notas', icon: '🎓', submenu: [
        { title: 'Gerir avaliações', to: '/portal/avaliacoes'},
        { title: 'Ver notas', to: '/portal/notas'}
    ]}] : [{ id: 3, title: 'Notas', icon: '🎓', submenu: [
        { title: 'Ver notas', to: '/portal/notas'}
    ]}])
  ];

  return (
    <SidebarContainer className={isCollapsed ? 'collapsed' : ''}>
      <SidebarHeader className={isCollapsed ? 'collapsed' : ''}>
        <Logo src={logo} alt="Logo" />
        <ToggleButton onClick={toggleSidebar} title="Expandir/Minimizar">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <HamburgerLine />
            <HamburgerLine />
            <HamburgerLine />
          </div>
        </ToggleButton>
      </SidebarHeader>

      <NavMenu className={isCollapsed ? 'collapsed' : ''}>
        {menuGroups.map(group => (
            <DropdownGroup key={group.id} title={group.title} icon={group.icon} isCollapsed={isCollapsed}>
                {group.submenu && group.submenu.map(item => (
                    <li key={`${group.id}-${item.title}`}>
                      <SubmenuItem to={item.to}>{item.title}</SubmenuItem>
                    </li>
                ))}
            </DropdownGroup>
        ))}
      </NavMenu>

      <LogoutContainer className={isCollapsed ? 'collapsed' : ''}>
        <LogoutButton onClick={handleLogout}>
          <LogoutText>Sair</LogoutText>
          <span>➔</span>
        </LogoutButton>
      </LogoutContainer>
    </SidebarContainer>
  );
};
