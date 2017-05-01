<template>
  <div>
  <header class="main center-align">
    <img src="./../assets/img/logo.png">
  </header>
  <section class="box blue">
      <div class="container">
        <div class="row">
          <div class="col s12">
            <div class="center-align">
              <h1>Learning Objects at the speed of light!</h1>
              <p class="lead">Create meaningful and engaging expereinces for your users today..</p>
              <a data-scroll href="#about" class="learn-more">Learn More &raquo;</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="strip purple center-align">
      <template v-for="type in types">
        <a @click.prevent="changeType(type.type)" class="btn-flat btn-large btn-action no-top-mar">Create a {{ type.name }} Object <i class="material-icons right">wb_incandescent</i></a>
       </template>
    </section>
    <section class="box grey center-align">
      <div class="row" id="about">
        <div class="col s12">
          <i class="material-icons"><i class="material-icons right">accessibility</i></i>
          <h3>Our Mission</h3>
          <p class="lead lg-pad md-mar">We want to support your mission of reaching students and users with <strong>high quality</strong> learning objects to supplement online teaching and information services. Sleek has been designed from bottom up to be the <strong>simplest possible solution</strong> to your problem. Sleek will allow you to generate learning objects on the fly and provide you the self-contained object ready for you to paste into your existing CMS or platform, ready to go! <strong>Simple as that</strong>!</p>
        </div>
      </div>

      <hr class="lg-mar">

      <div class="row">
        <div class="col m12 l4">
          <i class="material-icons">mode_edit</i>
          <h3>Reusable Objects</h3>
          <p class="lead">Putting the "R" in RLO! Each object is designed to be plugged back into the generator to pick up where you left off! Saving time and costs!</p>
        </div>
        <div class="col m12 l4">
          <i class="material-icons">publish</i>
          <h3>LibGuides Integration</h3>
          <p class="lead">Each self-contained learning object authored is 100% compatible with LibGuides, meaning all you do is copy and paste the generated HTML into your LibGuide and away you go!</p>
        </div>
        <div class="col m12 l4">
          <i class="material-icons">devices</i>
          <h3>Modern Design</h3>
          <p class="lead">Create awesome learning experiences for your users! Each learning object is uniquely designed for maximum impact!</p>
        </div>
      </div>
    </section>
    <footer class="main box blue footer center-align sm-pad">
      <p>&copy; 2017. Hand crafted in Australia by <a href="http://ashley.guru">ashley.guru</a>.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  data() {
    return {
      types: [
        {name: 'True or False', type: 'TrueFalse'}
      ]
    }
  },
  methods: {
    changeType(type) {
      this.$emit('changeType', type);
    }
  },
  mounted() {
    smoothScroll.init({
        speed: 1600,
        easing: 'easeInOutQuad',
    });
  }
}
</script>

<style type="text/css" scoped>
  header.main {
    background: #444;
    padding: 8px;
    margin: 0 auto;
  }
  header.main img {
    height: 53px;
  }
  h1 {
    text-shadow: 1px 1px 1px #111;
    font-weight: 100;
    font-size: 4.4rem;
    margin-bottom: 32px;
  }
  hr.lg-mar {
    margin: 100px;
  }
  footer.main{
    border-bottom: 8px solid #00bfa5;
    padding: 20px;
    font-size: 20px;
  }
  .box {
    padding: 100px 20px 60px 20px;
    color: #fff;
  }
  .box.blue {
    background: #0091ea;
  }
  .box.blue a {
    color: #fefefe;
    text-decoration: underline;
    letter-spacing: 1px;
  }
  .box.grey {
    background: #eeeeee !important;
    color: #8a8a8a;
  }
  .box.grey h3 {
    color: #525151;
  }
  .box.grey i.material-icons {
    font-size: 94px;
    color: #ababab;
  }
  .strip {
    padding: 28px;
  }
  .strip.purple {
    background: #8e24aa;
  }
</style>

<style type="text/css">
  .lg-pad {
    padding: 40px !important;
  }
  .sm-pad {
    padding: 12px;
  }
  .no-top-mar {
    margin-top: 0px !important;
  }
  .lg-pad {
    padding: 40px !important;
  }
  .sm-pad {
    padding: 12px;
  }
  .no-top-mar {
    margin-top: 0px !important;
  }
  .btn-action {
    margin-top: 30px;
    padding: 12px 35px;
    height: 76px;
    color: #fff;
  }
  a.learn-more {
    font-size: 18px;
  }
  p.lead {
    font-weight: 100;
    font-size: 26px;
    letter-spacing: 1px;
    padding: 24px;
  }
  p.lead.push {
    padding-left: 20px;
  }
  p.lead.lft-brd {
    border-left: 5px solid #aaa;
  }
</style>
