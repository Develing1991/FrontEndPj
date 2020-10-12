<template>
  <div>
    <table>
        <colgroup>
            <col style="width:100px;"/>
            <col style="width:20px;"/>
        </colgroup>
        <thead>
            <th scope="col">아이디</th>
            <th scope="col">잉</th>
        </thead>
        <tbody>
            <tr>
                <td>fsfds</td>
                <td>fsfds</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields: ['first_name', 'last_name', 'age'],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald', status: 'awesome' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
        ]
      }
    },
    methods: {
      rowClass(item, type) {
        if (!item || type !== 'row') return
        if (item.status === 'awesome') return 'table-success'
      }
    }
  }
</script>