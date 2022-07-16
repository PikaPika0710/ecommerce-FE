<template>
    <div>
        <div class="row notification-container">
            <h2 class="text-center">My Notifications</h2>
            <p class="dismiss text-right"><a id="dismiss-all" href="#">Dimiss All</a></p>
            <div class="card notification-card notification-invitation">
                <div class="card-body">
                    <table>
                        <tr>
                            <td style="width:70%">
                                <div class="card-title">Jane invited you to join '<b>Familia</b>' group</div>
                            </td>
                            <td style="width:30%">
                                <a href="#" class="btn btn-primary">View</a>
                                <a href="#" class="btn btn-danger dismiss-notification">Dismiss</a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="card notification-card notification-warning">
                <div class="card-body">
                    <table>
                        <tr>
                            <td style="width:70%">
                                <div class="card-title">Your expenses for '<b>Groceries</b>' has exceeded its budget
                                </div>
                            </td>
                            <td style="width:30%">
                                <a href="#" class="btn btn-primary">View</a>
                                <a href="#" class="btn btn-danger dismiss-notification">Dismiss</a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="card notification-card notification-danger">
                <div class="card-body">
                    <table>
                        <tr>
                            <td style="width:70%">
                                <div class="card-title">Insufficient budget to create '<b>Clothing</b>' budget category
                                </div>
                            </td>
                            <td style="width:30%">
                                <a href="#" class="btn btn-primary">View</a>
                                <a href="#" class="btn btn-danger dismiss-notification">Dismiss</a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="card notification-card notification-reminder">
                <div class="card-body">
                    <table>
                        <tr>
                            <td style="width:70%">
                                <div class="card-title">You have <b>2</b> upcoming payment(s) this week</div>
                            </td>
                            <td style="width:30%">
                                <a href="#" class="btn btn-primary">View</a>
                                <a href="#" class="btn btn-danger dismiss-notification">Dismiss</a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
</script>
<style scoped>
body {
    background-color: #fcfcfc;
}

.row {
    margin: auto;
    padding: 30px;
    width: 80%;
    display: flex;
    flex-flow: column;
}

.row .card {
    width: 100%;
    margin-bottom: 5px;
    display: block;
    transition: opacity 0.3s;
}


.card-body {
    padding: 0.5rem;
}

.card-body table {
    width: 100%;
}

.card-body table tr {
    display: flex;
}

.card-body table tr td a.btn {
    font-size: 0.8rem;
    padding: 3px;
}

td:nth-child(2) {
    text-align: right;
    justify-content: space-around;
}


.card-title:before {
    display: inline-block;
    font-family: 'Font Awesome\ 5 Free';
    font-weight: 900;
    font-size: 1.1rem;
    text-align: center;
    border: 2px solid grey;
    border-radius: 100px;
    width: 30px;
    height: 30px;
    padding-bottom: 3px;
    margin-right: 10px;
}

.notification-invitation .card-body .card-title:before {
    color: #90CAF9;
    border-color: #90CAF9;
    content: "\f007";
}

.notification-warning .card-body .card-title:before {
    color: #FFE082;
    border-color: #FFE082;
    content: "\f071";
}

.notification-danger .card-body .card-title:before {
    color: #FFAB91;
    border-color: #FFAB91;
    content: "\f00d";
}

.notification-reminder .card-body .card-title:before {
    color: #CE93D8;
    border-color: #CE93D8;
    content: "\f017";
}

.card.display-none {
    display: none;
    transition: opacity 2s;
}
</style>
