<template>
  <div>
    <voltar />
    <div class="cartao-list">
      <h5>Cartões Cadastrados</h5>
      <ul>
        <li class="active">
          <div class="img">
            <img src="/images/green.png" />
          </div>
          <div class="data">
            <span>111 111 111</span>
          </div>
          <div class="check">
            <img src="/images/check-mark.png" />
          </div>
        </li>
        <li>
          <div class="img">
            <img src="/images/green.png" />
          </div>
          <div class="data">
            <span>111 111 111</span>
          </div>
          <div class="check">
            <img src="/images/check-mark.png" />
          </div>
        </li>
        <li>
          <div class="img">
            <img src="/images/green.png" />
          </div>
          <div class="data">
            <span>111 111 111</span>
          </div>
          <div class="check">
            <img src="/images/check-mark.png" />
          </div>
        </li>
      </ul>
      <div class="plus">
        <span class="s-plus">
          <img src="/images/plus.png" />
        </span>
        <span class="text">Cadastrar novo cartão</span>
      </div>
    </div>
    <div class="botton">
      <button type="button" class="btn">SELECIONAR CARTÃO</button>
    </div>
  </div>
</template>

<script>
import voltar from '~/components/base/voltar'

export default {
  components: {
    voltar
  }
}
</script>
