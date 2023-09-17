class UsersDataHandler {
  NUMBER_OF_USERS = 5;
  API_URL = `https://randomuser.me/api?results=${this.NUMBER_OF_USERS}`;

  constructor() {
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  async fetchUsers() {
    try {
      const response = await fetch(this.API_URL);
      const { results } = await response.json();
      return results;
    } catch (err) {
      throw new Error('Fetch users data error!');
    }
  }
}

class UsersViewHandler {
  listUsersContainer = document.querySelector('.list-users-container');
  fetchStatusContainer = document.querySelector('.download-result-status');
  fetchStatusText = document.querySelector('.download-result-status-text');
  SUCCESS_MESSAGE = 'Success! List of users:';
  FAIL_MESSAGE = 'Failed to load users!';
  USER_DATA_CONTAINER_INNER_HTML_TEMPLATE = `
  <div class="user-data-img-container">
    <img src="{{USER_PICTURE}}" alt="user" />
  </div>
  <div class="user-text-info">
    <ul>
      <li>Country: {{USER_COUNTRY}}</li>
      <li>Email: {{USER_EMAIL}}</li>
      <li>Phone: {{USER_PHONE}}</li>
      <li>Coordinates: {{USER_COORDINATES}}</li>
    </ul>
  </div>
  `;

  constructor(usersDataHandler, fetchUsersButton) {
    this.usersDataHandler = usersDataHandler;
    this.fetchUsersButton = fetchUsersButton;

    this.handleBtnClick = this.handleBtnClick.bind(this);

    this.fetchUsersButton.addEventListener('click', this.handleBtnClick);
  }

  renderUsers(usersData) {
    for (const user of usersData) {
      const userDataElement = document.createElement('div');
      const userDataInnerHTML = this.fillInUserDataTemplate(user);
      userDataElement.innerHTML = userDataInnerHTML;
      userDataElement.classList.add('user-data');
      this.listUsersContainer.appendChild(userDataElement);
    }
  }

  fillInUserDataTemplate(user) {
    return this.USER_DATA_CONTAINER_INNER_HTML_TEMPLATE.replaceAll(
      '{{USER_PICTURE}}',
      user.picture.large
    )
      .replaceAll('{{USER_COUNTRY}}', user.location?.country)
      .replaceAll('{{USER_EMAIL}}', user.email)
      .replaceAll('{{USER_PHONE}}', user.phone)
      .replaceAll(
        '{{USER_COORDINATES}}',
        `<br>latitude: ${user.location?.coordinates?.latitude}
         <br>longitude: ${user.location?.coordinates?.longitude}`
      );
  }

  clearUsersContainer() {
    this.listUsersContainer.innerHTML = '';
    this.fetchStatusContainer.style.visibility = 'hidden';
  }

  renderFailMessage() {
    this.fetchStatusContainer.style.visibility = 'visible';
    this.fetchStatusText.style.color = 'red';
    this.fetchStatusText.innerText = this.FAIL_MESSAGE;
  }

  renderSuccessMessage() {
    this.fetchStatusContainer.style.visibility = 'visible';
    this.fetchStatusText.style.color = 'black';
    this.fetchStatusText.innerText = this.SUCCESS_MESSAGE;
  }

  async handleBtnClick() {
    this.clearUsersContainer();

    const usersData = await this.usersDataHandler.fetchUsers().catch(() => {
      this.renderFailMessage();
      return null;
    });

    if (!usersData) return;

    this.renderSuccessMessage();
    this.renderUsers(usersData);
  }
}

const fetchUsersButton = document.querySelector('.download-users-button');

new UsersViewHandler(new UsersDataHandler(), fetchUsersButton);
